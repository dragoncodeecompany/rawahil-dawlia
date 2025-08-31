import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Languages } from "@/constants/enums";
import Image from "next/image";

async function CirclePage({
  title_ar,
  title_en,
}: {
  title_ar: string;
  title_en: string;
}) {
  const locale = await getCurrentLocale();
  const isArabic = locale === Languages.ARABIC;
  return (
    <section>
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
        <div
          className={`absolute -top-[360px] sm:-top-[520px] ${
            isArabic
              ? "left-[-220px] sm:left-[-120px]"
              : "right-[-220px] sm:right-[-120px]"
          } w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] bg-[var(--primary)] rounded-full`}
        />

        <div
          className={`relative z-10 h-full flex items-center px-4 sm:px-10 w-full`}
        >
          <h1
            className={`w-full text-4xl sm:text-6xl font-semibold  text-white  lg:text-black ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {isArabic ? title_ar : title_en}
          </h1>
        </div>

        <Image
          width={200}
          height={200}
          src="/images/arrow-about.png"
          alt="About us arrow"
          className={`pointer-events-none select-none absolute z-10 bottom-0 w-[180px] sm:w-[260px] ${
            isArabic ? "left-4 sm:left-8" : "right-4 sm:right-8 rotate-180"
          }`}
        />
      </div>
    </section>
  );
}

export default CirclePage;
