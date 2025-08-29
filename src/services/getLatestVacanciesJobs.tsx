import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

export type LatestVacancyJobRow = {
  id: number;
  icon: string; // e.g., 'faGavel', 'faHospital'
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  sort_order: number;
  is_active: boolean;
};

export type LatestVacancyJob = {
  id: number;
  icon: string | null;
  title: string;
  description: string;
};

export async function getLatestVacanciesJobs(
  locale: Locale
): Promise<LatestVacancyJob[] | null> {
  const { data, error } = await supabaseAdmin
    .from("latest_vacancies_jobs")
    .select(
      "id, icon, title_ar, title_en, description_ar, description_en, sort_order, is_active"
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Error fetching latest vacancies jobs:", error);
    return null;
  }

  return data.map((row: LatestVacancyJobRow) => ({
    id: row.id,
    icon: row.icon ?? null,
    title: locale === "ar" ? row.title_ar : row.title_en,
    description: locale === "ar" ? row.description_ar : row.description_en,
  }));
}

export default getLatestVacanciesJobs;
