import getLatestVacanciesSection from "@/services/getLatestVacanciesSection";
import LatestVacanciesJobs from "./LatestVacanciesJobs";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

async function LatestVacancies() {
  const locale = await getCurrentLocale();
  const vacancies = await getLatestVacanciesSection(locale as "en" | "ar");
  return (
    <section className="lg:mt-[48px] mt-[20px]">
      <div className="flex flex-col items-center gap-2">
        <h5 className="text-[30px] md:text-[40px] lg:text-[60px] font-bold text-[var(--primary)] ">
          {vacancies?.title}
        </h5>
        <p className="text-[14px] lg:text-[16px] text-center max-w-[350px] md:max-w-full text-[var(--text)]">
          {vacancies?.description}
        </p>
      </div>
      <LatestVacanciesJobs />
    </section>
  );
}

export default LatestVacancies;
