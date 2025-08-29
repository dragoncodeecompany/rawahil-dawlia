import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

type LatestVacanciesSectionRow = {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
};

export type LatestVacanciesSection = {
  title: string;
  description: string;
} | null;

export async function getLatestVacanciesSection(
  locale: Locale
): Promise<LatestVacanciesSection> {
  const { data, error } = await supabaseAdmin
    .from("latest_vacancies_section")
    .select("id, title_ar, title_en, description_ar, description_en")
    .single<LatestVacanciesSectionRow>();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return {
    title: locale === "ar" ? data.title_ar : data.title_en,
    description: locale === "ar" ? data.description_ar : data.description_en,
  };
}

export default getLatestVacanciesSection;
