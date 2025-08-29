import { supabaseAdmin } from "@/lib/server";

export interface SocialMediaLink {
  id: number;
  platform: string;
  icon_name: string;
  url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getSocialMediaData(): Promise<SocialMediaLink[]> {
  const { data, error } = await supabaseAdmin
    .from("social_media_links")
    .select("*")
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching social media data:", error);
    return [];
  }

  return data || [];
}
