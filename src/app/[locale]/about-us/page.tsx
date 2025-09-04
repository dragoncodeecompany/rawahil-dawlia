import AboutTitle from "@/_components/aboutus/AboutTitle";
import Faq from "@/_components/aboutus/Faq";
import WhatChoose from "@/_components/aboutus/WhatChoose";
import CirclePage from "@/components/circlepage";
import { getMetaSeoAbout } from "@/services/seoMeta/getMetaSeoAbout";
import { Locale } from "@/i18n.config";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;
  return getMetaSeoAbout(locale);
}

function page() {
  return (
    <main>
      <CirclePage title_en="About Us" title_ar="من نحن" />
      <AboutTitle />
      <WhatChoose />
      <Faq />
    </main>
  );
}

export default page;
