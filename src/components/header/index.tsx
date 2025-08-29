import Image from "next/image";
import React from "react";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Navbar from "./Navbar";
import LanguageSwitcher from "./Language-switcher";

async function Header() {
  const locale = await getCurrentLocale();
  const { navbar } = await getTrans(locale);

  return (
    <header className="bg-[var(--drawing)] px-4 lg:px-[55px] py-[18px]">
      <div className="flex justify-between items-center">
        <Image src="/images/logo.svg" alt="logo" width={80} height={80} />
        {/* Mobile: group Navbar + LanguageSwitcher on the right; Desktop: unwrap to original layout */}
        <div className="flex items-center gap-3 md:contents">
          <Navbar translations={navbar} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
