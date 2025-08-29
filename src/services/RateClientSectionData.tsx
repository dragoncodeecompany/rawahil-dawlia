import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

type TestimonialsSectionRow = {
  id: string;
  title_en: string | null;
  title_ar: string | null;
  highlight_en: string | null;
  highlight_ar: string | null;
  alt_en: string | null;
  alt_ar: string | null;
};

export type TestimonialsSection = {
  title: string;
  highlight: string;
  alt: string;
} | null;

export async function getRateClientSectionData(
  locale: Locale
): Promise<TestimonialsSection> {
  const { data, error } = await supabaseAdmin
    .from("testimonials_section")
    .select(
      "id, title_en, title_ar, highlight_en, highlight_ar, alt_en, alt_ar"
    )
    .single<TestimonialsSectionRow>();

  if (error || !data) {
    console.error("getRateClientSectionData error", error);
    return null;
  }

  const isAr = locale === "ar";
  return {
    title: (isAr ? data.title_ar : data.title_en) ?? "",
    highlight: (isAr ? data.highlight_ar : data.highlight_en) ?? "",
    alt: (isAr ? data.alt_ar : data.alt_en) ?? "",
  };
}

export default getRateClientSectionData;
