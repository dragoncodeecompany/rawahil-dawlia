import { generateMetadata } from "./getMetaSeoHome";
import { Locale } from "@/i18n.config";

export async function getMetaSeoAbout(locale: Locale) {
  return generateMetadata("about", locale);
}
