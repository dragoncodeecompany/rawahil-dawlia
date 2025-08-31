import AboutTitle from "@/_components/aboutus/AboutTitle";
import Faq from "@/_components/aboutus/Faq";
import WhatChoose from "@/_components/aboutus/WhatChoose";
import CirclePage from "@/components/circlepage";
import React from "react";

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
