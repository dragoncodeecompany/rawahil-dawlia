"use client";

import React, { useEffect, useState } from "react";
import { Languages } from "@/constants/enums";
import { useParams, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeadset,
  faHouse,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
function Navbar({ translations }: { translations: { [key: string]: string } }) {
  const { locale } = useParams();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);
  const navItems = [
    {
      id: 1,
      label: translations.home,
      href: "/",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      id: 2,
      label: translations.about,
      href: "about-us",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },

    {
      id: 3,
      label: translations.contact,
      href: "contact-us",
      icon: <FontAwesomeIcon icon={faHeadset} />,
    },
  ];
  return (
    <nav className="relative">
      {/* Desktop menu */}
      <ul className="hidden md:flex gap-20 items-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}${item.href === "/" ? "" : `/${item.href}`}`}
            className={`flex items-center gap-2 font-semibold hover:text-[var(--primary)] duration-300 ${
              item.href === "/"
                ? pathName === `/${locale}`
                  ? "text-[var(--primary)]"
                  : "text-[var(--text)]"
                : pathName.startsWith(`/${locale}/${item.href}`)
                ? "text-[var(--primary)]"
                : "text-[var(--text)]"
            }`}
          >
            <span className="w-[20px] h-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="md:hidden p-2 rounded hover:bg-black/5 text-[var(--text)]"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="w-5 h-5" />
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul
          className={`absolute ${
            locale === Languages.ARABIC ? "left-0" : "right-0"
          } top-full mt-3 md:hidden z-50 min-w-[220px] rounded-md border border-black/10 bg-[var(--drawing)] shadow-lg p-2 flex flex-col min-h-[200px] gap-5`}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}${item.href === "/" ? "" : `/${item.href}`}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-semibold hover:bg-black/5 duration-200 ${
                item.href === "/"
                  ? pathName === `/${locale}`
                    ? "text-[var(--primary)]"
                    : "text-[var(--text)]"
                  : pathName.startsWith(`/${locale}/${item.href}`)
                  ? "text-[var(--primary)]"
                  : "text-[var(--text)]"
              }`}
            >
              <span className="w-[20px] h-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
