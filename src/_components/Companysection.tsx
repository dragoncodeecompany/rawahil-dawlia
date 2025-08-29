import React from "react";
import CompanyClient from "./CompanyClient";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getClientSection } from "@/services/getCompanySection";

async function Companysection() {
  const locale = await getCurrentLocale();
  const section = await getClientSection(locale as "en" | "ar");
  return (
    <section className="lg:mt-[48px] mt-[20px]">
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-[30px] md:text-[40px] lg:text-[60px] font-bold text-[var(--primary)] ">
          {section?.title}
        </h4>
        <p className="text-[14px] lg:text-[16px] text-center max-w-[350px] md:max-w-full text-[var(--text)]">
          {section?.description}
        </p>
      </div>
      <CompanyClient />
    </section>
  );
}

export default Companysection;
