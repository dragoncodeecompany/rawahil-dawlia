import "server-only";

import { Locale } from "@/i18n.config";
import { supabaseAdmin } from "@/lib/server";

export type AboutTitleRecord = {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string | null;
  image_alt_ar: string | null;
  image_alt_en: string | null;
  is_active: boolean;
  updated_at: string;
};

export type AboutTitleData = {
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
} | null;

export async function getAboutTitleData(
  locale: Locale
): Promise<AboutTitleData> {
  const { data, error } = await supabaseAdmin
    .from("about_page_title")
    .select(
      "id, title_ar, title_en, description_ar, description_en, image_url, image_alt_ar, image_alt_en, is_active, updated_at"
    )
    .eq("is_active", true)
    .single<AboutTitleRecord>();

  if (error || !data) {
    console.error("Error fetching about page title:", error);
    return null;
  }

  return {
    title: locale === "ar" ? data.title_ar : data.title_en,
    description: locale === "ar" ? data.description_ar : data.description_en,
    imageUrl: data.image_url,
    imageAlt: locale === "ar" ? data.image_alt_ar : data.image_alt_en,
  };
}
