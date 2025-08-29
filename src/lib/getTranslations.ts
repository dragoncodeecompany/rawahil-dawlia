// lib/getTranslations.ts

import { Locale } from "@/i18n.config";
import { supabase } from "./supabaseClient";

export type TranslationsType = Record<string, { en: string; ar: string }>;

export async function getTranslations(): Promise<TranslationsType> {
  const { data, error } = await supabase.from("translations").select("*");
  if (error) throw new Error(error.message);

  const translations: TranslationsType = {};
  data.forEach((item) => {
    translations[item.key] = { en: item.en, ar: item.ar };
  });

  return translations;
}

export function translate(
  key: string,
  locale: Locale,
  translations: TranslationsType
) {
  return translations[key][locale];
}
