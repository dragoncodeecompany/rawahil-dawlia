import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Languages } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getFaqsData } from "@/services/aboutpagedata/getFaqsData";

async function Faq() {
  const locale = await getCurrentLocale();
  const faqs = await getFaqsData(locale);
  return (
    <section className="mt-6 lg:mt-[48px] ">
      <h3 className="text-[30px] md:text-[40px] lg:text-[60px] font-medium text-[var(--primary)] px-0 lg:px-20 text-center lg:text-start">
        {locale === Languages.ENGLISH ? "FAQ" : "الأسئلة الشائعة"}
      </h3>

      <div className="flex flex-col items-center justify-center mt-5 gap-5">
        {faqs.map((faq, index) => {
          return (
            <Accordion
              key={faq.id || index}
              type="single"
              collapsible
              className="w-full px-4 lg:px-20"
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="bg-[var(--drawing-light)] px-4">
                  <span className="flex items-center gap-2 text-[var(--black)] ">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-[var(--whitelight)] py-4 px-4 text-[var(--text)]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
