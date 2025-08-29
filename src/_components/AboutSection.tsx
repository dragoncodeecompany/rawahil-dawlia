import { Button } from "@/components/ui/button";
import { Languages } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as RegularIcons from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAboutSection } from "@/services/getAboutSectionData";

async function AboutSection() {
  const locale = await getCurrentLocale();
  const data = await getAboutSection(locale as unknown as "en" | "ar");

  if (!data) return null;

  return (
    <section className="py-[48px]" dir="ltr">
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        <Image
          src="/images/aboutsection.png"
          width={600}
          height={600}
          alt="about us"
          className="ml-5"
        />
        <div className="bg-[url('/images/about_usmobile.png')] md:bg-[url('/images/aboutus_text.png')] bg-cover w-full lg:max-w-[800px] h-auto md:h-[612px] overflow-hidden ">
          <div
            className="px-3 lg:px-4 md:ml-[155px] py-8 md:py-0 lg:mt-10 "
            dir={locale === Languages.ENGLISH ? "ltr" : "rtl"}
          >
            <h2 className="font-bold text-3xl xl:text-[48px] text-black pt-8 md:pt-[92px] 2xl:pt-[120px]">
              {locale === Languages.ENGLISH ? "About Us" : "من نحن"}
            </h2>
            <p className="mb-4 md:mb-[16px] mt-2 text-base md:text-sm xl:text-lg text-[var(--text)]">
              {data.description}
            </p>
            <div className="flex flex-col gap-4 lg:gap-5">
              {data.texts.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-[40px] md:w-[44px] h-[40px] lg:h-[44px] bg-[var(--bold-drawing)] rounded-tl-[16px] rounded-br-[16px] text-primary text-[18px] flex items-center justify-center">
                    {item.icon && (
                      <FontAwesomeIcon
                        icon={
                          (RegularIcons[
                            item.icon as keyof typeof RegularIcons
                          ] ||
                            SolidIcons[
                              item.icon as keyof typeof SolidIcons
                            ]) as IconProp
                        }
                        className="w-[16px] md:w-[18px] h-[24px] md:h-[26px]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[12px] xl:text-[24px] font-bold">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/${locale}${data.route}`}>
              <Button className="text-[var(--whitelight)] w-[200px] lg:w-[250px]  h-[50px] xl:h-[60px] p-[16px] mt-6 md:mt-[24px] lg:text-[20px] font-medium text-sm">
                {data.texts?.[0]?.buttonLabel ||
                  (locale === Languages.ENGLISH
                    ? "More Info"
                    : "مزيد من المعلومات")}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={`${
                    locale === Languages.ARABIC ? "rotate-180" : ""
                  } text-[20px]`}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
