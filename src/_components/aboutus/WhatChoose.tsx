/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Languages } from "@/constants/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  getWhatChooseDataTranslated,
  WhyChooseUsItem,
  WhyChooseUsSettings,
} from "@/services/aboutpagedata/getWhatChooseData";

import { useParams } from "next/navigation";

// Add all solid icons to the library
library.add(fas);

// Function to get icon name from string
const getIconName = (iconName: string) => {
  const iconMap: { [key: string]: string } = {
    user: "user",
    star: "star",
    heart: "heart",
    shield: "shield-alt",
    clock: "clock",
    check: "check",
    award: "award",
    users: "users",
    lightbulb: "lightbulb",
    rocket: "rocket",
    gem: "gem",
    trophy: "trophy",
  };
  return iconMap[iconName] || "star";
};

function WhatChoose() {
  const params = useParams();
  const locale = params.locale as string;
  const [data, setData] = useState<WhyChooseUsItem[]>([]);
  const [settings, setSettings] = useState<WhyChooseUsSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWhatChooseDataTranslated(locale);
        if (result) {
          setData(result.items);
          setSettings(result.settings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return (
      <section className="px-4 xl:px-[80px] h-[450px] py-10 bg-[var(--whitelight)]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-[var(--text)]">جاري التحميل...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 xl:px-[80px] h-[450px] py-10">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[36px] xl:text-[48px] font-bold text-primary">
          {settings?.title ||
            (locale === Languages.ARABIC ? "لماذا تختارنا" : "Why Choose Us")}
        </h4>
        <p className="text-sm lg:text-[16px] font-medium text-[var(--text)] max-w-[567px] mt-4 sm:mt-6">
          {settings?.sub_title ||
            (locale === Languages.ARABIC
              ? "نحن نقدم أفضل الخدمات لعملائنا مع ضمان الجودة والموثوقية"
              : "We provide the best services to our clients with guaranteed quality and reliability")}
        </p>
      </div>
      <div className="mt-[20px] md:mt-[30px] flex justify-center">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            1521: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="w-full max-w-7xl"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-[var(--drawing-light)] rounded-lg p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[180px] xl:h-[193px] w-full xl:w-[389px]">
                <div className="flex justify-center mb-2 w-[32px] h-[32px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] text-primary text-[32px] md:text-[36px] lg:text-[40px]">
                  <FontAwesomeIcon icon={getIconName(item.icon) as any} />
                </div>
                <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium mb-[12px] md:mb-[14px] lg:mb-[16px] text-[var(--black)]">
                  {item.title}
                </h4>
                <p className="text-[var(--text)] text-center text-[12px] md:text-[13px] lg:text-[14px] pb-[12px] md:pb-[14px] lg:pb-[16px]">
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default WhatChoose;
