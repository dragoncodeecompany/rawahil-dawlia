import { supabaseAdmin } from "@/lib/server";

export async function getHeroSection(locale: "en" | "ar") {
  const { data, error } = await supabaseAdmin
    .from("hero_section")
    .select("*")
    .single(); // لو فيه صف واحد فقط

  if (error) {
    console.error(error);
    return null;
  }

  return {
    title: locale === "ar" ? data.title_ar : data.title_en,
    description: locale === "ar" ? data.description_ar : data.description_en,
    buttonText: locale === "ar" ? data.button_text_ar : data.button_text_en,
    cvUrl: data.send_cv_url,
  };
}
