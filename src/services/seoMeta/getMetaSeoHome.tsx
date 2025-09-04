import { supabaseServer } from "@/lib/supabase-server";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";

export interface MetaData {
  id: string;
  page_name: string;
  locale: string;
  title: string;
  description: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_url?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots?: string;
  favicon_url?: string;
  apple_touch_icon?: string;
  created_at: string;
  updated_at: string;
}

export async function getMetaSeoData(
  pageName: string,
  locale: Locale
): Promise<MetaData | null> {
  try {
    const { data, error } = await supabaseServer
      .from("meta_data")
      .select("*")
      .eq("page_name", pageName)
      .eq("locale", locale)
      .single();

    if (error) {
      console.error("Error fetching meta data:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getMetaSeoData:", error);
    return null;
  }
}

export async function generateMetadata(
  pageName: string,
  locale: Locale
): Promise<Metadata> {
  const metaData = await getMetaSeoData(pageName, locale);

  if (!metaData) {
    // Fallback metadata
    return {
      title: locale === "ar" ? "رواحل دولية" : "Rawahil Dawlia",
      description:
        locale === "ar"
          ? "وكالة توظيف رائدة متخصصة في ربط المواهب بالفرص المهنية المناسبة"
          : "Leading recruitment agency specializing in connecting talents with suitable career opportunities",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rawaheldawlia.com";

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.keywords,
    robots: metaData.robots,
    openGraph: {
      title: metaData.og_title || metaData.title,
      description: metaData.og_description || metaData.description,
      url:
        metaData.og_url || `${baseUrl}/${pageName === "home" ? "" : pageName}`,
      siteName: locale === "ar" ? "رواحل دولية" : "Rawahil Dawlia",
      images: metaData.og_image
        ? [
            {
              url: metaData.og_image.startsWith("http")
                ? metaData.og_image
                : `${baseUrl}${metaData.og_image}`,
              width: 1200,
              height: 630,
              alt: metaData.og_title || metaData.title,
            },
          ]
        : undefined,
      locale: locale,
      type: "website",
    },
    twitter: {
      card:
        (metaData.twitter_card as
          | "summary"
          | "summary_large_image"
          | "player"
          | "app") || "summary_large_image",
      title: metaData.twitter_title || metaData.title,
      description: metaData.twitter_description || metaData.description,
      images: metaData.twitter_image
        ? [
            metaData.twitter_image.startsWith("http")
              ? metaData.twitter_image
              : `${baseUrl}${metaData.twitter_image}`,
          ]
        : undefined,
    },
    alternates: {
      canonical:
        metaData.canonical_url ||
        `${baseUrl}/${pageName === "home" ? "" : pageName}`,
      languages: {
        ar: `${baseUrl}/ar/${pageName === "home" ? "" : pageName}`,
        en: `${baseUrl}/en/${pageName === "home" ? "" : pageName}`,
      },
    },
    icons: {
      icon: metaData.favicon_url || "/favicon.svg",
      apple: metaData.apple_touch_icon || "/favicon.svg",
    },
  };
}

// Specific function for home page
export async function getMetaSeoHome(locale: Locale): Promise<MetaData | null> {
  return getMetaSeoData("home", locale);
}

// Function to get favicon data
export async function getFaviconData(
  locale: Locale
): Promise<{ favicon: string; appleTouchIcon: string }> {
  const metaData = await getMetaSeoData("home", locale);

  return {
    favicon: metaData?.favicon_url || "/favicon.svg",
    appleTouchIcon: metaData?.apple_touch_icon || "/favicon.svg",
  };
}
