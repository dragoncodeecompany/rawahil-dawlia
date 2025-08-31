import { supabaseServer } from "@/lib/supabase-server";

export interface ContactUsData {
  id: number;
  title: string;
  title_ar: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  address?: string;
  address_ar?: string;
  section_type:
    | "call_center"
    | "email"
    | "location"
    | "social_media"
    | "header";
  description?: string;
  description_ar?: string;
  created_at: string;
  updated_at: string;
}

export async function getContactUsSectionData(
  locale: string = "en"
): Promise<ContactUsData[]> {
  try {
    const { data, error } = await supabaseServer
      .from("contact_us_section")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching contact us section data:", error);
      return [];
    }

    // Transform data based on locale
    const transformedData =
      (data as ContactUsData[])?.map((item) => ({
        ...item,
        title: locale === "ar" ? item.title_ar : item.title,
        address: locale === "ar" ? item.address_ar : item.address,
        description: locale === "ar" ? item.description_ar : item.description,
      })) || [];

    return transformedData;
  } catch (error) {
    console.error("Error in getContactUsSectionData:", error);
    return [];
  }
}
