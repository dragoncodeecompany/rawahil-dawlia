import { getSocialMediaData } from "@/services/getSochialData";
import ContactUsForm from "./ContactUsForm";
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
import Link from "@/components/link";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getContactUsSectionData } from "@/services/contactpagedata/getContactUsSection";
import { Languages } from "@/constants/enums";

async function ContactUsSection() {
  const locale = await getCurrentLocale();
  const socialLinks = await getSocialMediaData();
  const contactData = await getContactUsSectionData(locale);

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

  // Filter data by section type
  const headerData = contactData.filter(
    (item) => item.section_type === "header"
  );
  const callCenterData = contactData.filter(
    (item) => item.section_type === "call_center"
  );
  const emailData = contactData.filter((item) => item.section_type === "email");
  const locationData = contactData.filter(
    (item) => item.section_type === "location"
  );

  // Get header data (first item or default)
  const header = headerData[0] || {
    title: "Contact Us",
    description:
      "We're glad to hear from you at Rawahel Dawlia. Send us your inquiries or suggestions, and we'll respond promptly.",
  };

  return (
    <section className="mt-[48px]">
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-20 gap-20">
        <div>
          <div className="flex flex-col gap-3">
            <h2 className=" text-[32px] lg:text-[48px] font-bold text-[var(--primary)]">
              {header.title}
            </h2>
            <p className="max-w-[500px] text-[var(--text)] text-sm lg:text-[18px]">
              {header.description}
            </p>
          </div>
          <div className="mt-10 grid lg:grid-cols-2 gap-5 grid-cols-1">
            {/* Call Center Section */}
            {callCenterData.map((contact) => (
              <div key={contact.id} className="flex flex-col gap-3">
                <p className="text-[var(--primary)] lg:text-[28px] text-[20px] font-semibold">
                  {contact.title}
                </p>
                {contact.phone1 && (
                  <p className=" text-[16px] lg:text-[18px]">
                    {contact.phone1}
                  </p>
                )}
                {contact.phone2 && (
                  <p className=" text-[16px] lg:text-[18px]">
                    {contact.phone2}
                  </p>
                )}
              </div>
            ))}

            {/* Email Section */}
            {emailData.map((contact) => (
              <div key={contact.id} className="flex flex-col gap-3">
                <p className="text-[var(--primary)] lg:text-[28px] font-semibold text-[20px] ">
                  {contact.title}
                </p>
                {contact.email && (
                  <p className=" text-[16px] lg:text-[18px]">{contact.email}</p>
                )}
              </div>
            ))}

            {/* Location Section */}
            {locationData.map((contact) => (
              <div key={contact.id} className="flex flex-col gap-3">
                <p className="text-[var(--primary)] lg:text-[28px] text-[20px] font-semibold">
                  {contact.title}
                </p>
                {contact.address && (
                  <p className="max-w-[500px] text-sm">{contact.address}</p>
                )}
              </div>
            ))}

            {/* Social Media Section */}
            <div className="flex flex-col gap-3">
              <p className="text-[var(--primary)] lg:text-[28px] text-[20px] font-semibold">
                {locale === Languages.ARABIC
                  ? "وسائل التواصل الاجتماعي"
                  : "Social Media"}
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
          </div>
        </div>
        <ContactUsForm />
      </div>
    </section>
  );
}

export default ContactUsSection;
