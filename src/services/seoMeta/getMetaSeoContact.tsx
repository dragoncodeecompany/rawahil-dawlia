import { generateMetadata } from "./getMetaSeoHome";
import { Locale } from "@/i18n.config";

export async function getMetaSeoContact(locale: Locale) {
  return generateMetadata("contact", locale);
}
