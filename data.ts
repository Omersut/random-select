// Kehanet cevap havuzu (TR / EN)
// ÖNEMLİ: Kimlikler (id) sıraya göre üretilir. Kayıtlı koleksiyonlar bozulmasın diye
// yeni cümleleri her listenin SONUNA ekleyin, aradan silmeyin.

export type Category = "verdict" | "wisdom" | "dark" | "funny" | "rare" | "secret";

export interface Answer {
  id: string;
  cat: Category;
  tr: string;
  en: string;
}

type Pair = [tr: string, en: string];

const make = (cat: Category, prefix: string, list: Pair[]): Answer[] =>
  list.map(([tr, en], i) => ({ id: `${prefix}${i + 1}`, cat, tr, en }));

// Hükümler: evet/hayır sorularına kısa cevaplar
const verdicts: Pair[] = [
  ["Evet.", "Yes."],
  ["Hayır.", "No."],
  ["Kesinlikle evet.", "Absolutely yes."],
  ["Kesinlikle hayır.", "Absolutely not."],
  ["Henüz değil.", "Not yet."],
  ["Yeniden sor.", "Ask again."],
  ["Bunu zaten biliyorsun.", "You already know this."],
  ["Belirtiler olumlu.", "The signs say yes."],
  ["Görünüş iyi değil.", "The outlook is not good."],
  ["Şimdi söyleyemem.", "I cannot tell you now."],
  ["Evet, ama bir bedeli var.", "Yes, but at a price."],
  ["Hayır, ve bu iyi bir şey.", "No, and that is a good thing."],
  ["Belki.", "Maybe."],
  ["Zamanı gelince.", "When the time is right."],
  ["Kalbin evet diyor.", "Your heart says yes."],
  ["Aklın hayır diyor.", "Your mind says no."],
  ["Şüphesiz.", "Without a doubt."],
  ["Buna güvenme.", "Don't count on it."],
  ["Yıldızlar senden yana.", "The stars are on your side."],
  ["Yıldızlar sessiz.", "The stars are silent."],
  ["Önce kendine sor.", "Ask yourself first."],
  ["Cevap sende saklı.", "The answer hides within you."],
  ["Evet. Şimdi.", "Yes. Now."],
  ["Bekle.", "Wait."],
];

// Hükümlerin altına bazen eklenen kısa notlar (koleksiyona sayılmaz)
export const notes: { tr: string; en: string }[] = [
  { tr: "ama acele etme", en: "but don't rush" },
  { tr: "ama yalnız değil", en: "but not alone" },
  { tr: "ama önce bir adım geri at", en: "but take a step back first" },
  { tr: "ve bunu çoktan hissettin", en: "and you already felt it" },
  { tr: "ama bedelini düşün", en: "but weigh the cost" },
  { tr: "yarın daha net olacak", en: "it will be clearer tomorrow" },
  { tr: "sessizce", en: "quietly" },
  { tr: "ama herkese söyleme", en: "but don't tell everyone" },
  { tr: "ve korkma", en: "and do not be afraid" },
  { tr: "ama sabırla", en: "with patience" },
  { tr: "ama önce planla", en: "but plan it first" },
  { tr: "ve bu bir başlangıç", en: "and it is only the beginning" },
];

// Öğütler: umut veren, bilge cümleler
const wisdom: Pair[] = [
  ["Geleceğin sırrı, şimdi yaşadıklarındadır.", "The secret of the future lies in what you live now."],
  ["Bazen en zor sorular, sessizlikte cevap bulur.", "The hardest questions are often answered in silence."],
  ["Karanlıkta kaybolanlar, yıldızları en parlak görenlerdir.", "Those lost in the dark see the stars the brightest."],
  ["Her adım, yeni bir maceranın başlangıcıdır.", "Every step is the start of a new adventure."],
  ["Küçük bir merhaba, uzun bir yolculuğun başlangıcı olabilir.", "A small hello can begin a long journey."],
  ["Bazen yanlış tren, doğru istasyona götürür.", "Sometimes the wrong train takes you to the right station."],
  ["Kalbinin sesini dinle, cevap orada saklı.", "Listen to your heart; the answer hides there."],
  ["Geçmiş, geleceğin aynasıdır.", "The past is the mirror of the future."],
  ["Bir kapı kapanırken, diğeri açılır.", "As one door closes, another opens."],
  ["Bir adım geri atmak, bazen büyük bir sıçramanın başlangıcıdır.", "A step back is sometimes the start of a great leap."],
  ["Rüyalar, gerçekliğin kapısını aralayan anahtarlardır.", "Dreams are keys that open the door of reality."],
  ["İçindeki ateş, dünyayı aydınlatacak.", "The fire within you will light the world."],
  ["Yağmur damlaları, doğanın hikâyesini anlatan harflerdir.", "Raindrops are the letters of nature's story."],
  ["Güneş, en karanlık gecenin bile sonunu getirir.", "The sun ends even the darkest night."],
  ["Hiçbir kapı çalınmadan açılmaz.", "No door opens unless you knock."],
  ["Yarının hayali, bugünün kararlarıyla şekillenir.", "Tomorrow's dream is shaped by today's choices."],
  ["Zorluklar, içindeki gücü keşfetmeni sağlar.", "Hardship reveals the strength within you."],
  ["Bazen kaybolmak, kendini bulmanın en iyi yoludur.", "Sometimes getting lost is the best way to find yourself."],
  ["Kendi yolunu bulmak için bazen yolları terk etmek gerekir.", "To find your own path, sometimes you must leave the roads."],
  ["Dünya herkesin öğretmenidir; önemli olan aldığın derstir.", "The world teaches everyone; what matters is the lesson you take."],
  ["Gerçek güç, bilgide ve merhamette gizlidir.", "True strength hides in knowledge and compassion."],
  ["En büyük mutluluklar, en küçük ayrıntılarda saklıdır.", "The greatest joys hide in the smallest details."],
  ["Gerçek sevgi, ne zaman susacağını bilmektir.", "True love is knowing when to be silent."],
  ["Hayat bir sınav değil, bir deneyimdir.", "Life is not an exam; it is an experience."],
  ["Nehir, taşı gücüyle değil sabrıyla deler.", "The river cuts stone not by force, but by patience."],
  ["Aradığın şey, seni de arıyor.", "What you seek is seeking you too."],
  ["Tohum, toprağın altında da büyür.", "A seed grows even underground."],
  ["Korku bir sistir; adım attıkça dağılır.", "Fear is a fog; it lifts as you walk."],
  ["Ay her gece eksik görünür ama hep bütündür.", "The moon looks incomplete each night, yet it is always whole."],
  ["Sorunun kendisi, cevabın yarısıdır.", "The question itself is half the answer."],
  ["Bugün ektiğin, yarın gölgen olur.", "What you plant today becomes your shade tomorrow."],
  ["Yavaş giden de varır.", "The slow traveler arrives too."],
  ["Rüzgârı değiştiremezsin, yelkeni ayarlarsın.", "You can't change the wind, but you can adjust the sail."],
  ["Bir mum, bin mumu tutuşturur ve azalmaz.", "One candle lights a thousand and loses nothing."],
  ["Dağ, ona tırmananlara yol gösterir.", "The mountain guides those who climb it."],
  ["Kuş dalın kırılmasından korkmaz; kanatlarına güvenir.", "A bird fears no breaking branch; it trusts its wings."],
  ["Su, yolunu her zaman bulur.", "Water always finds its way."],
  ["Sabah, gecenin en karanlık anından sonra gelir.", "Morning comes right after the darkest hour."],
  ["Bazen cevap, soruyu bırakınca gelir.", "Sometimes the answer arrives once you let go of the question."],
  ["Yıldızlar, karanlık olmadan görünmez.", "Stars cannot shine without darkness."],
  ["Kendine nazik ol; yol uzun.", "Be gentle with yourself; the road is long."],
  ["Bir gülümseme, iki kalp arasındaki en kısa yoldur.", "A smile is the shortest path between two hearts."],
  ["Hiçbir kış sonsuza dek sürmez.", "No winter lasts forever."],
  ["Cesaret, korkuya rağmen yürümektir.", "Courage is walking despite the fear."],
  ["Bildiğin yol, seni bildiğin yere götürür.", "The known road leads to the known place."],
];

// Uyarılar: bilerek karanlık, tedirgin edici cümleler
const dark: Pair[] = [
  ["Bir umut ışığı, karanlıkta bile kaybolabilir.", "Even a light of hope can vanish in the dark."],
  ["En iyi niyetler bile istenmeyen sonuçlar doğurabilir.", "Even the best intentions can bring unwanted ends."],
  ["Gelecek, sis bulutlarının ardında gizli.", "The future hides behind clouds of fog."],
  ["Her hikâyenin mutlu bir sonu olmayabilir.", "Not every story has a happy ending."],
  ["En güçlü kahramanlar bile yorulur.", "Even the strongest heroes grow tired."],
  ["Bir kapı kapandığında, diğeri açılmayabilir.", "When a door closes, another may not open."],
  ["Güçlü olmak, bazen yalnız kalmak demektir.", "Being strong sometimes means being alone."],
  ["Zaman, bazen bir tuzak gibi işler.", "Time sometimes works like a trap."],
  ["Hayat, bazen sessiz bir çığlıktır.", "Life is sometimes a silent scream."],
  ["Bazı adımların geri dönüşü yoktur.", "Some steps have no way back."],
  ["En güzel şarkılar, en derin acıların sesidir.", "The most beautiful songs are the voice of the deepest pain."],
  ["Pusula her zaman doğruyu göstermez.", "The compass does not always point true."],
  ["Her kapı, ardında yeni bir mücadele getirir.", "Every door brings a new struggle behind it."],
  ["En iyi planlar bile en kötü sonla bitebilir.", "Even the best plans can end the worst way."],
  ["Bazen yol, bir çıkmaz sokaktır.", "Sometimes the road is a dead end."],
  ["En güçlü ağaçlar bile fırtınaya yenilir.", "Even the strongest trees fall to the storm."],
  ["Her kapının ardında kapana kısılmış bir hikâye var.", "Behind every door, a trapped story waits."],
  ["Gölgen senden önce yürüyor.", "Your shadow walks ahead of you."],
  ["Herkes gülümsüyor; herkes bir şey saklıyor.", "Everyone smiles; everyone hides something."],
  ["Aradığın cevap, duymak istediğin cevap değil.", "The answer you seek is not the one you want to hear."],
  ["Saat işliyor.", "The clock is ticking."],
  ["Bazı sorular sorulmamalı.", "Some questions should not be asked."],
  ["Unuttuğun şey seni unutmadı.", "What you forgot has not forgotten you."],
  ["Ayna yalan söylemez, ama her şeyi de göstermez.", "The mirror does not lie, but it doesn't show everything."],
  ["Sessizlik bazen bir uyarıdır.", "Silence is sometimes a warning."],
  ["Kaçtığın şey, seni bekliyor.", "What you run from is waiting for you."],
  ["Bugün kazandığını yarın kaybedebilirsin.", "What you win today, you may lose tomorrow."],
  ["Fırtına daha başlamadı.", "The storm hasn't started yet."],
  ["Bazı kapılar kapalı kalmalı.", "Some doors must stay closed."],
  ["Yanındaki herkes seninle aynı yöne bakmıyor.", "Not everyone beside you looks the same way."],
  ["Cevap gelecek, ama hazır olmayacaksın.", "The answer will come, but you won't be ready."],
];

// Şakalar: gizemi bir anlığına bozan esprili cevaplar
const funny: Pair[] = [
  ["Çözüm genellikle bilgisayarı yeniden başlatmaktır.", "The solution is usually to restart the computer."],
  ["Bir yere gitmenin en iyi yolu doğru yoldur. Ama ben yine de haritayı tercih ederim.", "The best way to get somewhere is the right road. I'd still take a map."],
  ["Önce bir çay demle. Sonra tekrar sor.", "Brew some tea first. Then ask again."],
  ["Evren şu an meşgul. Lütfen daha sonra tekrar deneyin.", "The universe is busy. Please try again later."],
  ["Bunu internete sordun mu?", "Have you tried searching the internet?"],
  ["Cevap evet, ama soru yanlış.", "The answer is yes, but the question is wrong."],
  ["Yıldızlar şu an toplantıda.", "The stars are in a meeting right now."],
  ["Önce bir bardak su iç. Çoğu şey ondan.", "Drink a glass of water first. It's usually that."],
  ["Bunu annene sor.", "Ask your mother."],
  ["Sanırım biraz uyuman gerek.", "I think you need some sleep."],
  ["Kehanet yükleniyor… %99…", "Prophecy loading… 99%…"],
  ["Evrenin bu konuda yorumu yok.", "The universe has no comment on this."],
  ["Evet. Hayır. Belki. Birini seç.", "Yes. No. Maybe. Pick one."],
  ["Kahveden sonra her şey daha net.", "Everything is clearer after coffee."],
  ["Bunu yarınki sen halletsin.", "Let tomorrow's you handle this."],
  ["Cevap buzdolabının arkasına düştü.", "The answer fell behind the fridge."],
  ["Kedine sor. O biliyor.", "Ask your cat. It knows."],
  ["Bu bir hata değil, özellik.", "It's not a bug, it's a feature."],
  ["Ctrl+Z hayatta çalışmıyor. Dikkatli ol.", "Ctrl+Z doesn't work in real life. Be careful."],
  ["Bunu düşünmeden önce bir şeyler ye.", "Eat something before you think about this."],
  ["Kristal kürem buğulandı, bir saniye siliyorum.", "My crystal ball fogged up, give me a second."],
  ["Kader: \"Görüldü.\"", "Fate: \"Seen.\""],
  ["Sence?", "What do you think?"],
  ["Soruyu bir daha oku. Sesli.", "Read your question again. Out loud."],
  ["Evren seni duydu ve güldü. Kibarca.", "The universe heard you and laughed. Politely."],
];

// Nadir kehanetler: yaklaşık %2 ihtimalle, altın renginde
const rare: Pair[] = [
  ["42!", "42!"],
  ["Bu kehaneti gören ilk kişisin. Belki de değilsin.", "You are the first to see this prophecy. Or maybe not."],
  ["Evren bugün sana göz kırptı.", "The universe winked at you today."],
  ["Bir dilek tut. Bu sefer gerçekten dinleniyor.", "Make a wish. This time someone is really listening."],
  ["Altın bir kapı açıldı. İçinden geç.", "A golden door has opened. Walk through."],
  ["Şans, tam şu an seninle.", "Luck is with you, right now."],
  ["Bu cevabı yüzde birlik bir ihtimalle gördün.", "You saw this with a one-in-a-hundred chance."],
  ["Yolun aydınlık. Gerçekten.", "Your path is bright. Truly."],
  ["Aradığın kişi de seni düşünüyor.", "The one you seek is thinking of you too."],
  ["Bugün yapacağın küçük şey, büyük bir şeyin başlangıcı.", "The small thing you do today begins something big."],
];

// Sırlar: yalnızca özel koşullarda açılır (bkz. lib/game.ts → draw)
const secrets: Answer[] = [
  { id: "s-42", cat: "secret", tr: "Hayatın, evrenin ve her şeyin cevabı. Bunu zaten biliyordun.", en: "The answer to life, the universe and everything. You knew that." },
  { id: "s-night", cat: "secret", tr: "Bu saatte uyanıksan, cevabı zaten biliyorsun.", en: "If you are awake at this hour, you already know the answer." },
  { id: "s-same", cat: "secret", tr: "Aynı soruyu tekrar sordun. Cevap değişmedi; peki sen değiştin mi?", en: "You asked the same question again. The answer didn't change. Did you?" },
  { id: "s-impatient", cat: "secret", tr: "Sabırsızsın. Evren acele etmez.", en: "You are impatient. The universe is never in a hurry." },
  { id: "s-who", cat: "secret", tr: "Ben, sorduğun sorunun yankısıyım.", en: "I am the echo of your own question." },
];

export const answers: Answer[] = [
  ...make("verdict", "v", verdicts),
  ...make("wisdom", "w", wisdom),
  ...make("dark", "d", dark),
  ...make("funny", "f", funny),
  ...make("rare", "r", rare),
  ...secrets,
];
