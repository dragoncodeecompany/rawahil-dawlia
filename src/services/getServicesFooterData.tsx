import { supabaseAdmin } from "@/lib/server";

type Locale = "en" | "ar";
export interface FooterService {
  id: number;
  title: string;
  title_ar?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FooterQuickLink {
  id: number;
  title: string;
  title_ar?: string;
  href: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FooterContactInfo {
  id: number;
  title: string;
  title_ar?: string;
  value: string;
  icon_name?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export async function getFooterServicesData(
  locale: Locale
): Promise<FooterService[]> {
  const { data, error } = await supabaseAdmin
    .from("footer_services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching footer services data:", error);
    return [];
  }

  return (data || []).map((service) => ({
    ...service,
    title: locale === "ar" ? service.title_ar : service.title,
  }));
}

export async function getFooterQuickLinksData(
  locale: Locale
): Promise<FooterQuickLink[]> {
  const { data, error } = await supabaseAdmin
    .from("footer_quick_links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching footer quick links data:", error);
    return [];
  }

  return (data || []).map((link) => ({
    ...link,
    title: locale === "ar" ? link.title_ar : link.title,
  }));
}

export async function getFooterContactInfoData(
  locale: Locale
): Promise<FooterContactInfo[]> {
  const { data, error } = await supabaseAdmin
    .from("footer_contact_info")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching footer contact info data:", error);
    return [];
  }

  return (data || []).map((info) => ({
    ...info,
    title: locale === "ar" ? info.title_ar : info.title,
  }));
}
