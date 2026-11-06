"use client";
import { useState } from "react";
import { answers } from "@/data";
import {
  achievementIcons,
  achievementOrder,
  categoryOrder,
  TOTAL,
  type Progress,
  type Screen,
} from "@/lib/game";
import { strings, type Lang } from "@/lib/i18n";

type Nav = (s: Screen) => void;

function LangSwitch({ lang, onLang }: { lang: Lang; onLang: (l: Lang) => void }) {
  return (
    <div className="seg">
      {(["tr", "en"] as Lang[]).map((l) => (
        <button key={l} className={lang === l ? "active" : ""} onClick={() => onLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function TopBar({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <div className="topbar">
      <button className="ghost-btn" onClick={onBack}>
        ← {label}
      </button>
    </div>
  );
}

/* ---------- Ana menü ---------- */

export function Menu({ p, onNav, onLang }: { p: Progress; onNav: Nav; onLang: (l: Lang) => void }) {
  const t = strings[p.lang];
  return (
    <div className="screen menu">
      <div className="orb static" aria-hidden />
      <h1 className="title">{t.title}</h1>
      <p className="tagline">{t.tagline}</p>
      <nav className="menu-list">
        <button className="menu-btn primary" onClick={() => onNav(p.seenIntro ? "play" : "howto")}>
          {p.asked > 0 ? t.continue : t.start}
        </button>
        <button className="menu-btn" onClick={() => onNav("howto")}>
          {t.howTo}
        </button>
        <button className="menu-btn" onClick={() => onNav("collection")}>
          {t.collection}
          <span className="muted">
            {p.discovered.length}/{TOTAL}
          </span>
        </button>
        <button className="menu-btn" onClick={() => onNav("settings")}>
          {t.settings}
        </button>
      </nav>
      <div className="menu-lang">
        <LangSwitch lang={p.lang} onLang={onLang} />
      </div>
    </div>
  );
}

/* ---------- Nasıl oynanır ---------- */

export function HowTo({ lang, onNav }: { lang: Lang; onNav: Nav }) {
  const t = strings[lang];
  return (
    <div className="screen scroll">
      <TopBar label={t.menu} onBack={() => onNav("menu")} />
      <div className="panel">
        <h2 className="section-title">{t.howTo}</h2>
        <ol className="steps">
          {t.howSteps.map((s, i) => (
            <li key={i}>
              <span className="step-num">{i + 1}</span>
              <div>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="secret-box">
          <b>◉ {t.howSecretsTitle}</b>
          <p>{t.howSecrets}</p>
        </div>
        <button className="menu-btn primary cta" onClick={() => onNav("play")}>
          {t.letsBegin}
        </button>
      </div>
    </div>
  );
}

/* ---------- Koleksiyon ---------- */

export function Collection({ p, onNav }: { p: Progress; onNav: Nav }) {
  const t = strings[p.lang];
  const found = new Set(p.discovered);
  const pct = Math.round((p.discovered.length / TOTAL) * 100);

  return (
    <div className="screen scroll">
      <TopBar label={t.menu} onBack={() => onNav("menu")} />
      <div className="panel">
        <h2 className="section-title">{t.collectionTitle}</h2>
        <div className="progress">
          <div style={{ width: `${pct}%` }} />
        </div>
        <p className="muted small center">
          {p.discovered.length}/{TOTAL} {t.discovered} · %{pct}
        </p>

        <h3 className="label">
          {t.achievementsTitle} · {p.achievements.length}/{achievementOrder.length}
        </h3>
        <div className="ach-grid">
          {achievementOrder.map((id) => {
            const on = p.achievements.includes(id);
            return (
              <div key={id} className={`ach ${on ? "on" : ""}`}>
                <span className="ach-icon">{on ? achievementIcons[id] : "?"}</span>
                <div>
                  <b>{t.ach[id].t}</b>
                  <small>{t.ach[id].d}</small>
                </div>
              </div>
            );
          })}
        </div>

        {categoryOrder.map((cat) => {
          const list = answers.filter((a) => a.cat === cat);
          const got = list.filter((a) => found.has(a.id));
          return (
            <section key={cat} className={`cat cat-${cat}`}>
              <h3>
                <span>{t.categories[cat]}</span>
                <span className="muted">
                  {got.length}/{list.length}
                </span>
              </h3>
              <div className="progress thin">
                <div style={{ width: `${(got.length / list.length) * 100}%` }} />
              </div>
              <ul>
                {got.map((a) => (
                  <li key={a.id} lang={p.lang}>
                    {a[p.lang]}
                  </li>
                ))}
              </ul>
              {got.length < list.length && <p className="muted small">{t.hiddenLeft(list.length - got.length)}</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Ayarlar ---------- */

export function Settings({
  p,
  onNav,
  onLang,
  onSound,
  onReset,
}: {
  p: Progress;
  onNav: Nav;
  onLang: (l: Lang) => void;
  onSound: (on: boolean) => void;
  onReset: () => void;
}) {
  const t = strings[p.lang];
  const [confirm, setConfirm] = useState<"idle" | "ask" | "done">("idle");

  const handleReset = () => {
    if (confirm === "ask") {
      onReset();
      setConfirm("done");
    } else {
      setConfirm("ask");
    }
  };

  return (
    <div className="screen scroll">
      <TopBar label={t.menu} onBack={() => onNav("menu")} />
      <div className="panel">
        <h2 className="section-title">{t.settings}</h2>

        <div className="row">
          <span>{t.language}</span>
          <LangSwitch lang={p.lang} onLang={onLang} />
        </div>
        <div className="row">
          <span>{t.sound}</span>
          <div className="seg">
            <button className={p.sound ? "active" : ""} onClick={() => onSound(true)}>
              {t.on}
            </button>
            <button className={!p.sound ? "active" : ""} onClick={() => onSound(false)}>
              {t.off}
            </button>
          </div>
        </div>

        <h3 className="label spaced">{t.stats}</h3>
        <div className="row">
          <span>{t.asked}</span>
          <b>{p.asked}</b>
        </div>
        <div className="row">
          <span>{t.streak}</span>
          <b>{p.streak}</b>
        </div>
        <div className="row">
          <span>{t.collection}</span>
          <b>
            {p.discovered.length}/{TOTAL}
          </b>
        </div>

        <button className="menu-btn danger cta" onClick={handleReset} disabled={confirm === "done"}>
          {confirm === "idle" ? t.reset : confirm === "ask" ? t.resetConfirm : t.resetDone}
        </button>
      </div>
    </div>
  );
}
