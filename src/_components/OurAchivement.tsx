import { getCurrentLocale } from "@/lib/getCurrentLocale";
import OurChiveDetails from "./OurChiveDetails";
import { getAchivementSection } from "@/services/getAchivementSection";

async function OurAchivement() {
  const locale = await getCurrentLocale();
  const section = await getAchivementSection(locale as "en" | "ar");
  return (
    <section className="lg:mt-[48px] mt-[20px]">
      <div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-[30px] md:text-[40px] lg:text-[60px] font-bold text-[var(--primary)] ">
            {section?.title}
          </h3>
          <p className="text-[14px] lg:text-[16px] text-center max-w-[350px] md:max-w-full text-[var(--text)]">
            {section?.description}
          </p>
        </div>
        <OurChiveDetails />
      </div>
    </section>
  );
}

export default OurAchivement;
