"use client";
import { useEffect, useRef, useState } from "react";
import { draw, type Drawn } from "@/lib/game";
import { strings, type Lang } from "@/lib/i18n";

type Phase = "idle" | "thinking" | "reveal" | "fading";

interface Props {
  lang: Lang;
  sound: boolean;
  discovered: number;
  total: number;
  onBack: () => void;
  onCollection: () => void;
  /** Cevabı kaydeder; yeni keşifse true döner */
  onAnswer: (d: Drawn, night: boolean) => boolean;
}

const SOUNDS = [
  { src: "/432.mp3", vol: 0.03, upTo: 0.3 },
  { src: "/fire.mp3", vol: 0.03, upTo: 0.7 },
  { src: "/space.mp3", vol: 0.02, upTo: 1 },
];

const THINK_MS = 1900;
const randPos = () => ({ x: 20 + Math.random() * 60, y: 64 + Math.random() * 18 });

export default function Oracle({ lang, sound, discovered, total, onBack, onCollection, onAnswer }: Props) {
  const t = strings[lang];
  const [phase, setPhase] = useState<Phase>("idle");
  const [question, setQuestion] = useState("");
  const [drawn, setDrawn] = useState<Drawn | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [thinking, setThinking] = useState("");
  const [pos, setPos] = useState({ x: 50, y: 70 });
  const [round, setRound] = useState(0);
  const [asked, setAsked] = useState(""); // ekranda gösterilen soru

  const timers = useRef<number[]>([]);
  const busyTaps = useRef(0);
  const lastQuestion = useRef("");
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      audio.current?.pause();
    },
    []
  );

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const playSound = () => {
    if (!sound) return;
    const r = Math.random();
    const s = SOUNDS.find((x) => r < x.upTo) ?? SOUNDS[0];
    try {
      audio.current?.pause();
      const a = new Audio(s.src);
      a.volume = s.vol;
      a.play().catch(() => {});
      audio.current = a;
    } catch {
      /* ses desteklenmiyorsa geç */
    }
  };

  const finish = () => {
    clearTimers();
    setPhase("fading");
    later(() => {
      setPhase("idle");
      setDrawn(null);
      setPos(randPos());
      setRound((r) => r + 1);
    }, 700);
  };

  const ask = () => {
    if (phase !== "idle") {
      busyTaps.current += 1; // sabırsızlık sırrı için sayılır
      return;
    }
    busyTaps.current = 0;
    setAsked(question.trim());
    setPhase("thinking");
    setThinking(t.thinking[Math.floor(Math.random() * t.thinking.length)]);
    playSound();

    later(() => {
      const hour = new Date().getHours();
      const d = draw({
        question,
        lastQuestion: lastQuestion.current,
        impatient: busyTaps.current >= 4,
        hour,
      });
      busyTaps.current = 0;
      lastQuestion.current = question;
      setIsNew(onAnswer(d, hour < 5));
      setDrawn(d);
      setPhase("reveal");
      setQuestion("");

      // Okuma süresi cevabın uzunluğuna göre
      const len = d.answer[lang].length + (d.note ? d.note[lang].length : 0);
      later(finish, Math.min(9000, Math.max(3800, 2400 + len * 65)));
    }, THINK_MS);
  };

  const words = drawn ? drawn.answer[lang].split(" ") : [];
  const after = words.length * 110;

  return (
    <div className="screen oracle">
      <div className="topbar">
        <button className="ghost-btn" onClick={onBack}>
          ← {t.menu}
        </button>
        <button className="ghost-btn counter" onClick={onCollection} title={t.collection}>
          ✦ {t.collection} {discovered}/{total}
        </button>
      </div>

      <div className={`prompt ${phase === "idle" ? "show" : ""}`}>
        <p className="prompt-text">{round === 0 ? t.promptFirst : t.promptAgain}</p>
        <input
          className="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={t.inputPlaceholder}
          maxLength={120}
          disabled={phase !== "idle"}
          lang={lang}
        />
      </div>

      <div
        className={`answer-zone ${phase === "reveal" ? "clickable" : ""}`}
        onClick={() => phase === "reveal" && finish()}
      >
        {asked && phase !== "idle" && <p className={`asked ${phase === "fading" ? "out" : ""}`}>“{asked}”</p>}
        {phase === "thinking" && <p className="thinking">{thinking}</p>}
        {drawn && (phase === "reveal" || phase === "fading") && (
          <div key={round} className={`answer tone-${drawn.answer.cat} ${phase === "fading" ? "out" : ""}`}>
            <h2 lang={lang}>
              {words.map((w, i) => (
                <span key={i} style={{ animationDelay: `${i * 110}ms` }}>
                  {w}&nbsp;
                </span>
              ))}
            </h2>
            {drawn.note && (
              <p className="note" style={{ animationDelay: `${after + 300}ms` }}>
                — {drawn.note[lang]}
              </p>
            )}
            {isNew && (
              <p className="badge" style={{ animationDelay: `${after + 600}ms` }}>
                ✦ {t.newDiscovery}
              </p>
            )}
            <p className="dismiss">{t.tapDismiss}</p>
          </div>
        )}
      </div>

      <div className="orb-wrap" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
        <button aria-label={t.tapHint} className={`orb ${phase}`} onClick={ask} />
        <p className={`orb-hint ${phase === "idle" && round < 3 ? "show" : ""}`}>{t.tapHint}</p>
      </div>
    </div>
  );
}
