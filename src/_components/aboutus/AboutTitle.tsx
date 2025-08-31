import { getAboutTitleData } from "@/services/aboutpagedata/getAboutTitleData";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Image from "next/image";

export default async function AboutTitle() {
  const locale = await getCurrentLocale();
  const data = await getAboutTitleData(locale);

  if (!data) return null;

  return (
    <section className="relative bg-[var(--drawing-light)] mx-4 lg:mx-20 mt-[48px] rounded-[20px] bg-[url('/images/earthbg.svg')] bg-no-repeat bg-center bg-contain">
      <div className="flex items-center gap-10 px-4 lg:px-6 py-[21px] justify-between relative z-10 flex-col lg:flex-row">
        {/* الصورة أولاً في التليفون، ثم العنوان في الديسكتوب */}
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            width={500}
            height={700}
            alt={data.imageAlt ?? ""}
            className="order-1 lg:order-2"
          />
        )}
        <div className="flex flex-col gap-4 order-2 lg:order-1">
          <h2 className="text-center text-[var(--primary)] text-[32px] font-semibold">
            {data.title}
          </h2>
          <p className="text-[var(--text)] max-w-[700px] leading-6 lg:leading-12">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
