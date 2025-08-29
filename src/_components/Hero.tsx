import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";

async function Hero() {
  const { data, error } = await supabaseServer
    .from("hero_section")
    .select(
      "title_ar, title_en, description_ar, description_en, button_text_ar, button_text_en, send_cv_url"
    );

  if (error) {
    console.error(error);
    return <div>حدث خطأ أثناء جلب البيانات</div>;
  }

  const locale = await getCurrentLocale();

  // ناخد أول record بس (لو الجدول فيه 1 row للـ hero section)
  const hero = data?.[0];

  if (!hero) return <div>لا توجد بيانات</div>;

  const title = locale === "ar" ? hero.title_ar : hero.title_en;
  const description =
    locale === "ar" ? hero.description_ar : hero.description_en;
  const buttonText =
    locale === "ar" ? hero.button_text_ar : hero.button_text_en;

  return (
    <section className="pt-20 relative h-[60vh] lg:h-[80vh] overflow-hidden">
      <div className="flex flex-col items-center px-10 lg:px-20 relative text-center gap-5">
        <h1 className="lg:text-[60px] font-bold text-[var(--primary)] text-[40px]">
          {title}
        </h1>
        <p className="text-center text-sm lg:text-[20px] max-w-[500px] !text-[var(--text)]">
          {description}
        </p>
        <Link href={hero.send_cv_url} target="_blank">
          <Button className="bg-[var(--primary)] text-[var(--whitelight)] w-[200px] lg:w-[322px] h-[75px] rounded-[50px] mt-5">
            {buttonText}
          </Button>
        </Link>
      </div>

      {/* Decorative shapes fixed to top-left of the page */}
      <div
        className=" left-0 top-0 pointer-events-none mt-20"
        aria-hidden="true"
      >
        <div className="absolute hidden lg:block bg-[var(--main)] w-40 lg:w-100 h-10 lg:h-20 rounded-[50px] rotate-[-156deg] -left-[110px] top-20"></div>
        <div className="absolute hidden lg:block bg-[var(--bold-drawing)] w-36 lg:w-100 h-10 lg:h-20 rounded-[50px] rotate-[-156deg] -left-[90px] top-50 "></div>
        <div className="absolute hidden lg:block bg-[var(--primary)] w-30 lg:w-100 h-10 lg:h-20 rounded-[50px] rotate-[-156deg] -left-[70px] top-80 "></div>
      </div>

      {/* Decorative shapes fixed to bottom-right of the page */}
      <div
        className="right-0 bottom-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute bg-[var(--main)] w-40 lg:w-100 h-10 lg:h-20 rounded-[50px] rotate-[-156deg] right-[-100] lg:bottom-[200px] bottom-[100px]"></div>
        <div className="absolute bg-[var(--bold-drawing)] w-36 lg:w-80 h-10 lg:h-20 rounded-[50px] rotate-[-156deg] right-[-100] lg:bottom-[300px] bottom-[200px]"></div>
        <div className="absolute bg-[var(--primary)] w-30 lg:w-60 h-10 lg:h-20 rounded-[50px] rotate-[-156deg] right-[-100] lg:bottom-[400px] bottom-[300px]"></div>
      </div>
    </section>
  );
}
export default Hero;
