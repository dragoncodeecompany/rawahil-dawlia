"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import {
  ClientCompanyRow,
  getClientCompanies,
} from "@/services/getClientCompaniesData";

function CompanyClient() {
  const [clientsData, setClientsData] = useState<ClientCompanyRow[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClientCompanies();
      if (data) {
        setClientsData(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mt-5 lg:mt-[70px]">
      {clientsData && clientsData.length > 0 && (
        <div className="bg-[var(--whitelight)] rounded-tl-[16px] rounded-br-[16px] w-full md:w-[90%] lg:w-[1284px] h-[96px] mx-auto p-4 md:p-0">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="w-full h-full flex items-center"
          >
            {clientsData.map((client) => (
              <SwiperSlide
                key={client.id}
                className="flex items-center justify-center h-full"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <a
                    href={client.company_url || "#"}
                    target={client.company_url ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={client.image_url || ""}
                      alt={client.alt || `Client ${client.id}`}
                      width={100}
                      height={50}
                      className="w-auto h-auto object-contain max-w-[80%] md:max-w-[90%] lg:max-w-full"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default CompanyClient;
