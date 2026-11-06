import type { Category } from "@/data";

export type Lang = "tr" | "en";

export type AchievementId =
  | "first"
  | "ten"
  | "fifty"
  | "everyCat"
  | "rare"
  | "secret"
  | "allSecrets"
  | "collector"
  | "night"
  | "streak3";

type AchText = Record<AchievementId, { t: string; d: string }>;

const tr = {
  title: "KEHANET",
  tagline: "Bir soru tut. Evren cevaplasın.",
  start: "Başla",
  continue: "Devam et",
  howTo: "Nasıl Oynanır",
  collection: "Koleksiyon",
  settings: "Ayarlar",
  menu: "Menü",
  back: "Geri",

  promptFirst: "Aklından bir soru tut…",
  promptAgain: "Yeni bir soru tut…",
  inputPlaceholder: "Sorunu yaz (isteğe bağlı)",
  tapHint: "Hazır olunca göze dokun",
  tapDismiss: "Kapatmak için dokun",
  newDiscovery: "Yeni keşif",
  thinking: [
    "Evren dinliyor…",
    "Yıldızlar hizalanıyor…",
    "Sis dağılıyor…",
    "Kader düğümleri çözülüyor…",
    "Sessizliğe kulak ver…",
    "Göz açılıyor…",
    "Cevap yaklaşıyor…",
  ],

  howSteps: [
    { t: "Bir soru tut", d: "Aklından bir soru geçir. İstersen yaz, yazmak zorunda değilsin." },
    { t: "Göze dokun", d: "Hazır hissettiğinde ekrandaki göze dokun. Evren biraz düşünecek." },
    { t: "Cevabı oku", d: "Cevap sisin içinden belirir: bazen bir hüküm, bazen bir öğüt, bazen bir uyarı." },
    { t: "Tekrarla ve topla", d: "Her yeni cevap koleksiyonuna eklenir. Göz her seferinde yer değiştirir; onu bul ve devam et." },
  ],
  howSecretsTitle: "Sırlar",
  howSecrets:
    "Bazı kehanetler çok nadirdir ve altın renginde parlar. Bazıları ise yalnızca belirli sorularla, belirli saatlerde ya da belirli davranışlarla açılır. Hangileri olduğunu söylemeyeceğiz.",
  letsBegin: "Hadi başlayalım",

  collectionTitle: "Koleksiyon",
  discovered: "kehanet keşfedildi",
  achievementsTitle: "Başarımlar",
  hiddenLeft: (n: number) => `+ ${n} kehanet hâlâ gizli`,
  categories: {
    verdict: "Hükümler",
    wisdom: "Öğütler",
    dark: "Uyarılar",
    funny: "Muzip Anlar",
    rare: "Nadir Kehanetler",
    secret: "Sırlar",
  } as Record<Category, string>,

  language: "Dil",
  sound: "Ses",
  on: "Açık",
  off: "Kapalı",
  stats: "İstatistikler",
  asked: "Sorulan soru",
  streak: "Gün serisi",
  reset: "İlerlemeyi sıfırla",
  resetConfirm: "Emin misin? Tekrar dokun",
  resetDone: "Sıfırlandı",

  achievementUnlocked: "Başarım açıldı",
  ach: {
    first: { t: "İlk Soru", d: "İlk sorunu sor." },
    ten: { t: "Meraklı", d: "10 soru sor." },
    fifty: { t: "Müdavim", d: "50 soru sor." },
    everyCat: { t: "Kaleydoskop", d: "Hüküm, öğüt, uyarı ve muzip anların her birinden en az birini bul." },
    rare: { t: "Altın Kehanet", d: "Nadir bir kehanet gör." },
    secret: { t: "Sır Avcısı", d: "İlk sırrı keşfet." },
    allSecrets: { t: "Sırların Efendisi", d: "Bütün sırları bul." },
    collector: { t: "Koleksiyoncu", d: "Kehanetlerin yarısını keşfet." },
    night: { t: "Gece Kuşu", d: "Gece yarısı ile sabah 5 arasında soru sor." },
    streak3: { t: "Sadık", d: "3 gün üst üste gel." },
  } as AchText,
};

export type Strings = typeof tr;

const en: Strings = {
  title: "ORACLE",
  tagline: "Hold a question. Let the universe answer.",
  start: "Start",
  continue: "Continue",
  howTo: "How to Play",
  collection: "Collection",
  settings: "Settings",
  menu: "Menu",
  back: "Back",

  promptFirst: "Hold a question in your mind…",
  promptAgain: "Hold a new question…",
  inputPlaceholder: "Type your question (optional)",
  tapHint: "Touch the eye when ready",
  tapDismiss: "Tap to close",
  newDiscovery: "New discovery",
  thinking: [
    "The universe is listening…",
    "The stars are aligning…",
    "The fog is lifting…",
    "Untangling the threads of fate…",
    "Listen to the silence…",
    "The eye is opening…",
    "The answer draws near…",
  ],

  howSteps: [
    { t: "Hold a question", d: "Think of a question. You can type it if you like, but you don't have to." },
    { t: "Touch the eye", d: "When you feel ready, touch the eye on the screen. The universe will think for a moment." },
    { t: "Read the answer", d: "The answer rises out of the fog: sometimes a verdict, sometimes wisdom, sometimes a warning." },
    { t: "Repeat and collect", d: "Every new answer joins your collection. The eye moves each time; find it and keep going." },
  ],
  howSecretsTitle: "Secrets",
  howSecrets:
    "Some prophecies are very rare and glow in gold. Others only appear with certain questions, at certain hours or after certain behaviour. We won't tell you which.",
  letsBegin: "Let's begin",

  collectionTitle: "Collection",
  discovered: "prophecies discovered",
  achievementsTitle: "Achievements",
  hiddenLeft: (n: number) => `+ ${n} still hidden`,
  categories: {
    verdict: "Verdicts",
    wisdom: "Wisdom",
    dark: "Warnings",
    funny: "Playful Moments",
    rare: "Rare Prophecies",
    secret: "Secrets",
  },

  language: "Language",
  sound: "Sound",
  on: "On",
  off: "Off",
  stats: "Stats",
  asked: "Questions asked",
  streak: "Day streak",
  reset: "Reset progress",
  resetConfirm: "Are you sure? Tap again",
  resetDone: "Reset",

  achievementUnlocked: "Achievement unlocked",
  ach: {
    first: { t: "First Question", d: "Ask your first question." },
    ten: { t: "Curious", d: "Ask 10 questions." },
    fifty: { t: "Regular", d: "Ask 50 questions." },
    everyCat: { t: "Kaleidoscope", d: "Find at least one verdict, wisdom, warning and playful moment." },
    rare: { t: "Golden Prophecy", d: "See a rare prophecy." },
    secret: { t: "Secret Hunter", d: "Discover your first secret." },
    allSecrets: { t: "Keeper of Secrets", d: "Find every secret." },
    collector: { t: "Collector", d: "Discover half of all prophecies." },
    night: { t: "Night Owl", d: "Ask between midnight and 5 AM." },
    streak3: { t: "Devoted", d: "Come back 3 days in a row." },
  },
};

export const strings: Record<Lang, Strings> = { tr, en };
