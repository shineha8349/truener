import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Truener — 趣味で繋がる、本気の出会い",
  description:
    "SNSの趣味データでリアルな共通点を見つける、婚活マッチングアプリ",
  metadataBase: new URL("https://truener.vercel.app"),
  openGraph: {
    title: "Truener — 趣味で繋がる、本気の出会い",
    description: "SNSの趣味データでリアルな共通点を見つける、婚活マッチングアプリ",
    url: "https://truener.vercel.app",
    siteName: "Truener",
    images: [
      {
        url: "/images/hero-couple.png",
        width: 1200,
        height: 630,
        alt: "Truener — 趣味で繋がる、本気の出会い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truener — 趣味で繋がる、本気の出会い",
    description: "SNSの趣味データでリアルな共通点を見つける、婚活マッチングアプリ",
    images: ["/images/hero-couple.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
