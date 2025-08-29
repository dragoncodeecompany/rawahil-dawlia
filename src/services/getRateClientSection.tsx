import { supabaseServer } from "@/lib/supabase-server";

export type RateClientItem = {
  id: number;
  quote: string;
  name: string;
  image: string | null;
  rate: number | null;
  created_at: string;
};

export async function getRateClients() {
  const { data, error } = await supabaseServer
    .from("testimonials")
    .select("id, quote, name, image, rate, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getRateClients error", error);
    return { data: [] as RateClientItem[], error };
  }

  return { data: (data as RateClientItem[]) ?? [], error: null };
}
