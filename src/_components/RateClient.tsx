import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getRateClients } from "@/services/getRateClientSection";
import { getRateClientSectionData } from "@/services/RateClientSectionData";

export async function RateClients() {
  const locale = await getCurrentLocale();
  const section = await getRateClientSectionData(locale);
  const { data } = await getRateClients();
  const items = data.map(({ quote, name, image, rate }) => ({
    quote,
    name,
    image: image ?? undefined,
    rate: typeof rate === "number" ? Math.max(0, Math.min(5, rate)) : undefined,
  }));
  return (
    <section id="testimonials" className="lg:mt-[48px] mt-[20px]">
      <div className="flex items-center flex-col gap-2 justify-center text-center">
        <h6 className="text-[30px] md:text-[40px] lg:text-[60px] font-bold">
          {section?.title ?? "Kind words from"}
          <span className="text-[var(--primary)]">
            {" "}
            {section?.highlight ?? "satisfied clients"}
          </span>
        </h6>
      </div>

      <div className="flex flex-col items-center ">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className=" mt-5 lg:mt-[70px] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards items={items} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  );
}

// Items are loaded from Supabase on the server via getRateClients
