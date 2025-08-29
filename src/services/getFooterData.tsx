import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";

export interface FooterData {
  id: number;
  description: string;
  description_ar: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getFooterData(
  locale: Locale
): Promise<FooterData | null> {
  const { data, error } = await supabaseAdmin
    .from("footer_data")
    .select("*")
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    description: locale === "ar" ? data.description_ar : data.description,
  };
}
