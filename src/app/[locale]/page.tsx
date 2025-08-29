import AboutSection from "@/_components/AboutSection";
import Ads from "@/_components/Ads";

import Companysection from "@/_components/Companysection";
import Hero from "@/_components/Hero";
import LatestVacancies from "@/_components/LatestVacancies";
import OurAchivement from "@/_components/OurAchivement";
import { RateClients } from "@/_components/RateClient";

import Termination from "@/_components/Termination";

import React from "react";

async function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Ads />
      <AboutSection />
      <OurAchivement />
      <Termination />
      <Companysection />
      <LatestVacancies />
      <RateClients />
    </main>
  );
}

export default Home;
