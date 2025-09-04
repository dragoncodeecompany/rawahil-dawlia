import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Locale } from "@/i18n.config";
import { Directions, Languages } from "@/constants/enums";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import {
  generateMetadata as generateMetaData,
  getFaviconData,
} from "@/services/seoMeta/getMetaSeoHome";

const Vietnam = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const locale = (await params).locale;
  return generateMetaData("home", locale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const locale = (await params).locale;
  const faviconData = await getFaviconData(locale);

  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <head>
        <link rel="icon" href={faviconData.favicon} />
        <link rel="apple-touch-icon" href={faviconData.appleTouchIcon} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${Vietnam.className} ${cairo.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
