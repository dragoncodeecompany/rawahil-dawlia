import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Image from "next/image";
import React from "react";
import { getTerminationSection } from "@/services/getTerminationData";

async function Termination() {
  const locale = await getCurrentLocale();
  const terminationData = await getTerminationSection(locale);

  if (!terminationData) {
    return (
      <section className="mt-[48px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-[var(--text)]">
            <p>No termination data available</p>
          </div>
        </div>
      </section>
    );
  }

  // Helper function to validate URL
  const isValidImageUrl = (url: string | null): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section className="mt-[48px]">
      <div>
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-[30px] md:text-[40px] lg:text-[60px] font-bold text-[var(--primary)] text-center">
            {terminationData.title}
          </h4>
          {terminationData.paragraph && (
            <p className="text-[14px] lg:text-[16px] text-center max-w-[600px] text-[var(--text)]">
              {terminationData.paragraph}
            </p>
          )}
        </div>

        <div className="px-4 lg:px-[113px]">
          <div className="w-full py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {terminationData.cards.map((card) => (
              <div
                key={card.id}
                className="relative bg-[var(--drawing-light)] min-h-[300px] flex flex-col items-center justify-center rounded-[20px] gap-2 p-4"
              >
                {card.imageUrl && isValidImageUrl(card.imageUrl) && (
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    width={139}
                    height={84}
                  />
                )}
                <p className="text-[24px] font-semibold text-[var(--black)]">
                  {card.title}
                </p>
                {card.description && (
                  <p className="text-[14px] text-[var(--text)] text-center">
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Termination;
