"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import { useParams } from "next/navigation";
import {
  getArchivementData,
  type ArchivementRow,
} from "@/services/getArchivementData";

// Register ScrollTrigger plugin

function AnimatedNumber({
  value,
  extra,
  delay,
}: {
  value: number;
  extra: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => {
    return Math.floor(current);
  });

  useEffect(() => {
    if (isInView) {
      spring.set(0);
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span>{display}</motion.span>
      <span className="text-primary">{extra}</span>
    </motion.span>
  );
}

function OurChiveDetails() {
  const { locale } = useParams();
  const [data, setData] = useState<ArchivementRow[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await getArchivementData();
      if (isMounted) setData(res);
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="bg-[var(--drawing-light)] lg:mx-[80px] rounded-[20px] mt-[48px] mx-4">
      <div className="flex flex-col xl:flex-row items-center justify-between px-4 md:px-8 lg:px-[89px] py-8 md:py-12 lg:py-[45px] gap-8 md:gap-4 lg:gap-0">
        {(data ?? []).map((item, index) => (
          <div key={item.id} className="flex flex-col items-center gap-2">
            <p className="text-4xl lg:text-6xl lg:text-[82px] font-bold">
              <AnimatedNumber
                value={Number(item.number)}
                extra={item.extra ?? ""}
                delay={index * 0.3}
              />
            </p>
            <p className="text-sm md:text-base lg:text-lg">
              {locale === "ar" ? item.name_ar : item.name_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurChiveDetails;
