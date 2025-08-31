import ContactUsSection from "@/_components/contactus/ContactUsSection";
import Maps from "@/_components/contactus/Maps";
import CirclePage from "@/components/circlepage";
import React from "react";

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
