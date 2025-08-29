import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

type AboutSectionRow = {
  id: number;
  description_ar: string;
  description_en: string;
  route: string;
  icon: string | null;
};

type AboutSectionTextRow = {
  id: number;
  about_section_id: number;
  text_ar: string;
  text_en: string;
  icon: string | null;
  button_label_ar: string;
  button_label_en: string;
  button_route: string;
};

export type AboutSectionData = {
  description: string;
  route: string;
  icon: string | null;
  texts: Array<{
    text: string;
    icon: string | null;
    buttonLabel: string;
    buttonRoute: string;
  }>;
} | null;

export async function getAboutSection(
  locale: Locale
): Promise<AboutSectionData> {
  // نجيب الـ about_section الرئيسية (لو فيه واحدة بس)
  const { data: aboutData, error: aboutError } = await supabaseAdmin
    .from("about_section")
    .select("id, description_ar, description_en, route, icon")
    .single<AboutSectionRow>(); // لو فيه صف واحد فقط

  if (aboutError || !aboutData) {
    console.error(aboutError);
    return null;
  }

  // نجيب كل النصوص المرتبطة بالـ about_section
  const { data: textsData, error: textsError } = (await supabaseAdmin
    .from("about_section_text")
    .select(
      "id, about_section_id, text_ar, text_en, icon, button_label_ar, button_label_en, button_route"
    )
    .eq("about_section_id", aboutData.id)) as unknown as {
    data: AboutSectionTextRow[] | null;
    error: unknown;
  };

  if (textsError || !textsData) {
    console.error(textsError);
    return null;
  }

  return {
    description:
      locale === "ar" ? aboutData.description_ar : aboutData.description_en,
    route: aboutData.route,
    icon: aboutData.icon ?? null,
    texts: textsData.map((item: AboutSectionTextRow) => ({
      text: locale === "ar" ? item.text_ar : item.text_en,
      icon: item.icon ?? null,
      buttonLabel:
        locale === "ar" ? item.button_label_ar : item.button_label_en,
      buttonRoute: item.button_route,
    })),
  };
}
