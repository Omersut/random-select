import { answers, notes, type Answer, type Category } from "@/data";
import type { AchievementId, Lang } from "@/lib/i18n";

export type Screen = "menu" | "howto" | "play" | "collection" | "settings";

/* ---------- İlerleme (localStorage) ---------- */

export interface Progress {
  lang: Lang;
  sound: boolean;
  asked: number;
  discovered: string[];
  achievements: AchievementId[];
  lastDay: string;
  streak: number;
  seenIntro: boolean;
}

export const defaultProgress: Progress = {
  lang: "tr",
  sound: true,
  asked: 0,
  discovered: [],
  achievements: [],
  lastDay: "",
  streak: 0,
  seenIntro: false,
};

const STORAGE_KEY = "kehanet-progress-v2";

export function loadProgress(): Progress | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

export function saveProgress(p: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* gizli sekme vb. — sessizce geç */
  }
}

/* ---------- Cevap seçimi ---------- */

export const TOTAL = answers.length;
export const categoryOrder: Category[] = ["verdict", "wisdom", "dark", "funny", "rare", "secret"];

const byId = (id: string) => answers.find((a) => a.id === id)!;

// Karıştırılmış torba: bir kategorideki tüm cevaplar görülmeden hiçbiri tekrar gelmez
const used: Partial<Record<Category, Set<string>>> = {};

function pickFrom(cat: Category): Answer {
  const pool = answers.filter((a) => a.cat === cat);
  const bag = used[cat] ?? (used[cat] = new Set<string>());
  if (bag.size >= pool.length) bag.clear();
  const fresh = pool.filter((a) => !bag.has(a.id));
  const a = fresh[Math.floor(Math.random() * fresh.length)];
  bag.add(a.id);
  return a;
}

// Gece (00–05) uyarılar daha sık gelir; %2 ihtimalle nadir kehanet
function pickCategory(hour: number): Category {
  if (Math.random() < 0.02) return "rare";
  const night = hour < 5;
  const weights: [Category, number][] = night
    ? [["verdict", 32], ["wisdom", 26], ["dark", 37], ["funny", 5]]
    : [["verdict", 37], ["wisdom", 40], ["dark", 18], ["funny", 5]];
  const total = weights.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [c, w] of weights) {
    r -= w;
    if (r < 0) return c;
  }
  return "verdict";
}

// Harf, rakam ve boşluk dışındaki her şey (Unicode farkında)
const NON_WORD = new RegExp("[^\\p{L}\\p{N}\\s]", "gu");

export function normalize(q: string) {
  return q
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(NON_WORD, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface Drawn {
  answer: Answer;
  note?: { tr: string; en: string };
}

export function draw(o: { question: string; lastQuestion: string; impatient: boolean; hour: number }): Drawn {
  const q = normalize(o.question);

  // Sırlar
  if (o.impatient) return { answer: byId("s-impatient") };
  if (/(^| )kimsin( |$)|sen nesin|who are you|what are you/.test(q)) return { answer: byId("s-who") };
  if (/(^|\D)42(\D|$)/.test(q)) return { answer: byId("s-42") };
  if (q.length > 0 && q === normalize(o.lastQuestion)) return { answer: byId("s-same") };
  if (o.hour === 3 && Math.random() < 0.33) return { answer: byId("s-night") };

  const cat = pickCategory(o.hour);
  const answer = pickFrom(cat);
  let note: Drawn["note"];
  if (cat === "verdict" && !answer.tr.includes(",") && Math.random() < 0.6) {
    note = notes[Math.floor(Math.random() * notes.length)];
  }
  return { answer, note };
}

/* ---------- Başarımlar ---------- */

export const achievementOrder: AchievementId[] = [
  "first", "ten", "fifty", "everyCat", "rare", "secret", "allSecrets", "collector", "night", "streak3",
];

export const achievementIcons: Record<AchievementId, string> = {
  first: "✦",
  ten: "◈",
  fifty: "❂",
  everyCat: "✺",
  rare: "☉",
  secret: "◉",
  allSecrets: "∞",
  collector: "✧",
  night: "☾",
  streak3: "△",
};

export function evaluate(p: Progress, ctx: { night: boolean }): AchievementId[] {
  const has = (id: string) => p.discovered.includes(id);
  const catFound = (c: Category) => answers.some((a) => a.cat === c && has(a.id));
  const secretList = answers.filter((a) => a.cat === "secret");

  const checks: Record<AchievementId, boolean> = {
    first: p.asked >= 1,
    ten: p.asked >= 10,
    fifty: p.asked >= 50,
    everyCat: (["verdict", "wisdom", "dark", "funny"] as Category[]).every(catFound),
    rare: catFound("rare"),
    secret: catFound("secret"),
    allSecrets: secretList.every((s) => has(s.id)),
    collector: p.discovered.length >= Math.ceil(TOTAL * 0.5),
    night: ctx.night,
    streak3: p.streak >= 3,
  };
  return achievementOrder.filter((id) => checks[id] && !p.achievements.includes(id));
}

/* ---------- Gün serisi ---------- */

function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function nextStreak(p: Progress): { lastDay: string; streak: number } {
  const now = new Date();
  const today = dayKey(now);
  if (p.lastDay === today) return { lastDay: today, streak: p.streak };
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  return { lastDay: today, streak: p.lastDay === dayKey(y) ? p.streak + 1 : 1 };
}
