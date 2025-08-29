import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

type TerminationSectionRow = {
  id: string;
  title_en: string;
  title_ar: string;
  paragraph_en: string | null;
  paragraph_ar: string | null;
};

type TerminationCardRow = {
  id: string;
  termination_section_id: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
};

export type TerminationData = {
  title: string;
  paragraph: string | null;
  cards: Array<{
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
  }>;
} | null;

export async function getTerminationSection(
  locale: Locale
): Promise<TerminationData> {
  // Get the main termination section (assuming there's only one)
  const { data: sectionData, error: sectionError } = await supabaseAdmin
    .from("termination_section")
    .select("id, title_en, title_ar, paragraph_en, paragraph_ar")
    .single<TerminationSectionRow>();

  if (sectionError || !sectionData) {
    console.error(sectionError);
    return null;
  }

  // Get all cards related to the termination section
  const { data: cardsData, error: cardsError } = (await supabaseAdmin
    .from("termination_cards")
    .select(
      "id, termination_section_id, title_en, title_ar, description_en, description_ar, image_url"
    )
    .eq("termination_section_id", sectionData.id)) as unknown as {
    data: TerminationCardRow[] | null;
    error: unknown;
  };

  if (cardsError || !cardsData) {
    console.error(cardsError);
    return null;
  }

  return {
    title: locale === "ar" ? sectionData.title_ar : sectionData.title_en,
    paragraph:
      locale === "ar" ? sectionData.paragraph_ar : sectionData.paragraph_en,
    cards: cardsData.map((card: TerminationCardRow) => ({
      id: card.id,
      title: locale === "ar" ? card.title_ar : card.title_en,
      description: locale === "ar" ? card.description_ar : card.description_en,
      imageUrl: card.image_url,
    })),
  };
}
