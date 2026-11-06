"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Oracle from "@/components/Oracle";
import { Collection, HowTo, Menu, Settings } from "@/components/Screens";
import {
  achievementIcons,
  defaultProgress,
  evaluate,
  loadProgress,
  nextStreak,
  saveProgress,
  TOTAL,
  type Drawn,
  type Progress,
  type Screen,
} from "@/lib/game";
import { strings, type AchievementId, type Lang } from "@/lib/i18n";

interface Toast {
  key: number;
  id: AchievementId;
}

export default function Home() {
  const [p, setP] = useState<Progress>(defaultProgress);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>("menu");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const pRef = useRef(p);

  const update = useCallback((next: Progress) => {
    pRef.current = next;
    setP(next);
    saveProgress(next);
  }, []);

  // İlk açılış: kayıtlı ilerlemeyi yükle, yoksa tarayıcı diline göre başla
  useEffect(() => {
    const saved = loadProgress();
    const initial: Progress = saved ?? {
      ...defaultProgress,
      lang: navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en",
    };
    pRef.current = initial;
    setP(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = p.lang;
    document.title = p.lang === "tr" ? "Kehanet — Bir soru tut" : "Oracle — Hold a question";
  }, [p.lang]);

  const t = strings[p.lang];

  const showToasts = (ids: AchievementId[]) => {
    ids.forEach((id, i) => {
      const key = Date.now() + i;
      window.setTimeout(() => {
        setToasts((ts) => [...ts, { key, id }]);
        window.setTimeout(() => setToasts((ts) => ts.filter((x) => x.key !== key)), 4000);
      }, 1500 + i * 900);
    });
  };

  const onAnswer = (d: Drawn, night: boolean) => {
    const cur = pRef.current;
    const isNew = !cur.discovered.includes(d.answer.id);
    const next: Progress = {
      ...cur,
      ...nextStreak(cur),
      asked: cur.asked + 1,
      discovered: isNew ? [...cur.discovered, d.answer.id] : cur.discovered,
    };
    const unlocked = evaluate(next, { night });
    if (unlocked.length) {
      next.achievements = [...next.achievements, ...unlocked];
      showToasts(unlocked);
    }
    update(next);
    return isNew;
  };

  const nav = (s: Screen) => {
    if (s === "howto" && !pRef.current.seenIntro) update({ ...pRef.current, seenIntro: true });
    setScreen(s);
  };
  const setLang = (lang: Lang) => update({ ...pRef.current, lang });
  const setSound = (sound: boolean) => update({ ...pRef.current, sound });
  const reset = () =>
    update({ ...defaultProgress, lang: pRef.current.lang, sound: pRef.current.sound, seenIntro: true });

  return (
    <main className="stage">
      <div className="stars" aria-hidden />
      <div className="stars stars-2" aria-hidden />
      <div className="frame" aria-hidden />

      {ready && screen === "menu" && <Menu p={p} onNav={nav} onLang={setLang} />}
      {ready && screen === "howto" && <HowTo lang={p.lang} onNav={nav} />}
      {ready && screen === "collection" && <Collection p={p} onNav={nav} />}
      {ready && screen === "settings" && (
        <Settings p={p} onNav={nav} onLang={setLang} onSound={setSound} onReset={reset} />
      )}
      {ready && screen === "play" && (
        <Oracle
          lang={p.lang}
          sound={p.sound}
          discovered={p.discovered.length}
          total={TOTAL}
          onBack={() => nav("menu")}
          onCollection={() => nav("collection")}
          onAnswer={onAnswer}
        />
      )}

      <div className="toasts" aria-live="polite">
        {toasts.map((x) => (
          <div key={x.key} className="toast">
            <span>{achievementIcons[x.id]}</span>
            <div>
              <small>{t.achievementUnlocked}</small>
              <b>{t.ach[x.id].t}</b>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
