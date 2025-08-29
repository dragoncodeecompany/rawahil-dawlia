import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as RegularIcons from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getLatestVacanciesJobs from "@/services/getLatestVacanciesJobs";

async function LatestVacanciesJobs() {
  const locale = await getCurrentLocale();
  const jobs = await getLatestVacanciesJobs(locale as "en" | "ar");

  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="px-4 lg:px-[113px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 lg:mt-[70px]">
      {jobs.map((job) => {
        const iconExport = (RegularIcons[
          job.icon as keyof typeof RegularIcons
        ] || SolidIcons[job.icon as keyof typeof SolidIcons]) as
          | IconProp
          | undefined;
        return (
          <div
            key={job.id}
            className="w-full h-[300px] flex flex-col bg-[var(--drawing-light)] items-center gap-6 justify-center p-4 rounded-[20px]"
          >
            <FontAwesomeIcon
              icon={iconExport as IconProp}
              className="text-[50px] text-[var(--primary)]"
            />
            <p className="font-semibold text-[18px] text-[var(--text)] text-center">
              {job.title}
            </p>
            <p className="text-sm text-center">{job.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default LatestVacanciesJobs;
