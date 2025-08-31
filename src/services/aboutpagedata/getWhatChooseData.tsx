import { supabase } from "@/lib/supabaseClient";
import { Languages } from "@/constants/enums";

export interface WhyChooseUsItem {
  id: number;
  title: string;
  title_en: string;
  text: string;
  text_en: string;
  icon: string;
  sort_order: number;
  is_active?: boolean; // حسب الجدول لو موجود
}

export interface WhyChooseUsSettings {
  id: number;
  title: string;
  title_en: string;
  sub_title: string;
  sub_title_en: string;
  is_active?: boolean; // حسب الجدول لو موجود
}

export interface WhyChooseUsData {
  items: WhyChooseUsItem[];
  settings: WhyChooseUsSettings | null;
}

export async function getWhatChooseData(
  locale: string
): Promise<WhyChooseUsData | null> {
  try {
    // الحصول على البيانات الأساسية
    const { data: items, error: itemsError } = await supabase
      .from("why_choose_us")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (itemsError) {
      console.error("Error fetching why choose us items:", itemsError);
      return null;
    }

    // الحصول على الإعدادات
    const { data: settings, error: settingsError } = await supabase
      .from("why_choose_us_settings")
      .select("*")
      .eq("is_active", true)
      .single();

    if (settingsError && settingsError.code !== "PGRST116") {
      console.error("Error fetching why choose us settings:", settingsError);
    }

    return {
      items: items || [],
      settings: settings || null,
    };
  } catch (error) {
    console.error("Error in getWhatChooseData:", error);
    return null;
  }
}

// Function للحصول على البيانات مع الترجمة المناسبة
export async function getWhatChooseDataTranslated(locale: string) {
  const data = await getWhatChooseData(locale);

  if (!data) return null;

  // ترجمة البيانات حسب اللغة
  const translatedItems = data.items.map((item) => ({
    id: item.id,
    title: locale === Languages.ARABIC ? item.title : item.title_en,
    title_en: item.title_en,
    text: locale === Languages.ARABIC ? item.text : item.text_en,
    text_en: item.text_en,
    icon: item.icon,
    sort_order: item.sort_order,
  }));

  const translatedSettings = data.settings
    ? {
        id: data.settings.id,
        title:
          locale === Languages.ARABIC
            ? data.settings.title
            : data.settings.title_en,
        title_en: data.settings.title_en,
        sub_title:
          locale === Languages.ARABIC
            ? data.settings.sub_title
            : data.settings.sub_title_en,
        sub_title_en: data.settings.sub_title_en,
      }
    : null;

  return {
    items: translatedItems,
    settings: translatedSettings,
  };
}
