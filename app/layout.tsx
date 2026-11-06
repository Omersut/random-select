import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kehanet — Bir soru tut",
  description:
    "Aklından bir soru tut, göze dokun ve evrenin cevabını oku. Nadir kehanetleri ve gizli sırları keşfet, koleksiyonunu tamamla.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06050b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
