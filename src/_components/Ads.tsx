"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

function Ads() {
  const portfolioAds = [
    { id: 1, title: "Rawahel dawlia" },
    { id: 2, title: "Rawahel dawlia" },
    { id: 3, title: "Rawahel dawlia" },
    { id: 4, title: "Rawahel dawlia" },
    { id: 5, title: "Rawahel dawlia" },
    { id: 6, title: "Rawahel dawlia" },
    { id: 7, title: "Rawahel dawlia" },
    { id: 8, title: "Rawahel dawlia" },
  ];
  return (
    <div className="bg-[var(--primary)] !text-white  w-full lg:w-full right-0 h-[80px] sm:h-[90px] md:h-[110px] -rotate-[3deg] relative !overflow-hidden mb-3 z-10">
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={2}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 2,
          },
        }}
        loop={true}
        freeMode={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="h-full flex items-center"
      >
        {portfolioAds.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center justify-center h-full"
          >
            <div
              className="flex items-center justify-center gap-2 h-full"
              dir="ltr"
            >
              <Image
                src="/images/iconads.png"
                alt={item.title}
                width={20}
                height={24}
                className="flex-shrink-0 w-[20px] h-[24px] sm:w-[26px] sm:h-[31px] rotate-[120deg]"
              />
              <h2 className="text-[24px] sm:text-[18px] md:text-[20px] font-medium whitespace-nowrap text-center">
                {item.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Ads;
