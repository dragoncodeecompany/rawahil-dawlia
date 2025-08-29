import {
  faInstagram,
  faLinkedin,
  faSquareFacebook,
  faTwitter,
  faWhatsapp,
  faTelegram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getSocialMediaData } from "@/services/getSochialData";
import {
  getFooterServicesData,
  getFooterQuickLinksData,
  getFooterContactInfoData,
} from "@/services/getServicesFooterData";
import { getFooterData } from "@/services/getFooterData";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const iconMap: Record<string, IconDefinition> = {
  faSquareFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faWhatsapp,
  faTelegram,
  faYoutube,
  faTiktok,
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
};
async function Footer() {
  const locale = await getCurrentLocale();
  const socialLinks = await getSocialMediaData();
  const services = await getFooterServicesData(locale);
  const quickLinks = await getFooterQuickLinksData(locale);
  const contactInfo = await getFooterContactInfoData(locale);
  const footerData = await getFooterData(locale);

  return (
    <footer className="bg-[var(--drawing-light)] w-full h-auto lg:mt-[48px] mt-[20px]">
      <div className="px-4 lg:px-[83px] pt-20 pb-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-5">
          <Image src="/images/logo.svg" width={50} height={50} alt="logo" />
          <p className="max-w-[394px] text-[var(--black)] font-normal leading-6 text-sm">
            {footerData?.description ||
              "Innovative travel solutions that create unforgettable experiences and connect people with the world."}
          </p>
          <ul>
            <li className="flex gap-3">
              {socialLinks.map((socialLink) => (
                <Link
                  key={socialLink.id}
                  href={socialLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <FontAwesomeIcon
                    icon={iconMap[socialLink.icon_name]}
                    className="text-[var(--primary)] text-[24px]"
                  />
                </Link>
              ))}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-[var(--primary)] font-bold text-[24px] border-b-2 border-[var(--main)] pb-[2px] w-fit">
            {locale === "ar" ? "الخدمات" : "Services"}
          </p>

          <ul className="flex flex-col gap-2">
            {services.map((service) => (
              <li
                key={service.id}
                className="text-[var(--text)] text-sm hover:text-[var(--primary)] transition-colors duration-300 cursor-pointer"
              >
                {service.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-[var(--primary)] font-bold text-[24px] border-b-2 border-[var(--main)] pb-[2px] w-fit">
            {locale === "ar" ? "الروابط السريعة" : "Quick Links"}
          </p>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.id} className="text-[var(--text)] text-sm">
                <Link
                  href={link.href}
                  className="hover:text-[var(--primary)] transition-colors duration-300"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-[var(--primary)] font-bold text-[24px] border-b-2 border-[var(--main)] pb-[2px] w-fit">
            {locale === "ar" ? "معلومات الاتصال" : "Contact Info"}
          </p>
          <ul className="flex flex-col gap-2">
            {contactInfo.map((info) => (
              <li
                key={info.id}
                className="text-[var(--text)] text-sm flex items-center gap-2"
              >
                {info.icon_name && (
                  <FontAwesomeIcon
                    icon={iconMap[info.icon_name]}
                    className="text-[var(--primary)] text-sm"
                  />
                )}
                <span>
                  {info.title}: {info.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 py-4 px-4 gap-4">
        <p className="text-[var(--text)] text-sm">
          {locale === "ar"
            ? "جميع الحقوق محفوظة © رواهل دولية للتوظيف الخارجي"
            : "All rights reserved © Rawahel dawlia for recruitment abroad"}
        </p>
        <p className="text-[var(--black)] text-sm text-center">
          Design and development by___
          <span>
            <Link
              href="https://web.facebook.com/dragoncodee/?_rdc=1&_rdr#"
              className="text-[var(--primary)] font-bold text-[16px]"
            >
              DRAGON CODE🐉
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
