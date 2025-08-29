import { supabase } from "@/lib/supabaseClient";

export type ArchivementRow = {
  id: number;
  number: number;
  extra: string | null;
  name_ar: string;
  name_en: string;
};

export async function getArchivementData(): Promise<ArchivementRow[] | null> {
  const { data, error } = await supabase
    .from("ourachievements_details")
    .select("id, number, extra, name_ar, name_en")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return null;
  }

  return (data as ArchivementRow[]) ?? null;
}
