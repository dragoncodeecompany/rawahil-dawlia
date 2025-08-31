import { supabaseServer } from "@/lib/supabase-server";

export interface FaqItem {
  id: number;
  icon: string;
  question_en: string;
  answer_en: string;
  question_ar: string;
  answer_ar: string;
  created_at?: string;
  updated_at?: string;
}

export interface TransformedFaq {
  id: number;
  icon: string;
  question: string;
  answer: string;
}

export async function getFaqsData(
  locale: string = "en"
): Promise<TransformedFaq[]> {
  try {
    const { data, error } = await supabaseServer
      .from("faqs")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) {
      console.error("Error fetching FAQ data:", error);
      return [];
    }

    // Transform data to match the component's expected format
    const transformedData: TransformedFaq[] = data.map((item: FaqItem) => ({
      id: item.id,
      icon: item.icon,
      question: locale === "ar" ? item.question_ar : item.question_en,
      answer: locale === "ar" ? item.answer_ar : item.answer_en,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error in getFaqsData:", error);
    return [];
  }
}
