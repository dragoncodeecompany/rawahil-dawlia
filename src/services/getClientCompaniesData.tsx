import { supabase } from "@/lib/supabaseClient";

export type ClientCompanyRow = {
  id: number;
  image_url: string;
  company_url: string;
  alt: string;
};

export async function getClientCompanies(): Promise<ClientCompanyRow[] | null> {
  const { data, error } = await supabase
    .from("client_companies")
    .select("id, image_url, company_url, alt")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching client companies:", error);
    return null;
  }

  return (data as ClientCompanyRow[]) ?? null;
}
