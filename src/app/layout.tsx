import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nekomeshi.app'),
  title: {
    default: 'ねこ飯 - 猫のごはん記録',
    template: '%s | ねこ飯',
  },
  description: '愛猫のごはんを記録して、みんなの記録からうちの子に合うフードを探そう。キャットフードの食いつきや健康への影響がわかる猫ごはんアプリ。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ねこ飯',
    title: 'ねこ飯 - 猫のごはん記録',
    description: '愛猫のごはんを記録して、みんなの記録からうちの子に合うフードを探そう。',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'ねこ飯',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ねこ飯 - 猫のごはん記録',
    description: '愛猫のごはんを記録して、みんなの記録からうちの子に合うフードを探そう。',
    images: ['/icon.png'],
  },
  other: {
    'theme-color': '#F97316',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3MCXYLLME2"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3MCXYLLME2');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
