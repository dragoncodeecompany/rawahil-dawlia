import ContactUsSection from "@/_components/contactus/ContactUsSection";
import Maps from "@/_components/contactus/Maps";
import CirclePage from "@/components/circlepage";
import { getMetaSeoContact } from "@/services/seoMeta/getMetaSeoContact";
import { Locale } from "@/i18n.config";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;
  return getMetaSeoContact(locale);
}

function page() {
  return (
    <main>
      <CirclePage title_ar="تواصل معنا" title_en="Contact Us" />
      <ContactUsSection />
      <Maps />
    </main>
  );
}

export default page;
