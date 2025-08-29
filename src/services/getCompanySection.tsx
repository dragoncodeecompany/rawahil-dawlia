import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

type ClientSectionRow = {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
};

export type ClientSection = {
  title: string;
  description: string;
} | null;

export async function getClientSection(locale: Locale): Promise<ClientSection> {
  const { data, error } = await supabaseAdmin
    .from("clients_section")
    .select("id, title_ar, title_en, description_ar, description_en")
    .single<ClientSectionRow>();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return {
    title: locale === "ar" ? data.title_ar : data.title_en,
    description: locale === "ar" ? data.description_ar : data.description_en,
  };
}
