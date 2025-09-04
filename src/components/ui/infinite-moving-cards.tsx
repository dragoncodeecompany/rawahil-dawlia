"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    image?: string;
    rate?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const container = containerRef.current;
      const scroller = scrollerRef.current;
      const initialChildren = Array.from(scroller.children);

      // Measure width of one full set
      const setWidth = initialChildren.reduce((acc, child) => {
        const el = child as HTMLElement;
        return acc + el.offsetWidth;
      }, 0);

      // Set scroll distance to one set width for seamless loop
      container.style.setProperty("--scroll-distance", `${setWidth}px`);

      // Duplicate items until scroller content is at least 2x container width
      const minTotalWidth = container.offsetWidth + setWidth;
      let currentWidth = scroller.scrollWidth;
      while (currentWidth < minTotalWidth) {
        initialChildren.forEach((child) => {
          const duplicatedItem = child.cloneNode(true);
          scroller.appendChild(duplicatedItem);
        });
        currentWidth = scroller.scrollWidth;
      }

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "normal"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsRTL(document?.dir === "rtl");
    }
  }, []);
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 w-full overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-300 bg-[var(--drawing-light)] px-8 py-8 min-h-[250px] md:min-h-[220px] md:w-[450px] "
            key={idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span
                className={cn(
                  "relative z-20 text-sm leading-[1.6] font-normal text-[var(--text)]"
                )}
              >
                {item.quote}
              </span>
              <div
                className={cn(
                  "absolute bottom-4 flex items-center gap-3 pointer-events-none select-none pt-4",
                  isRTL ? "right-4" : "left-4"
                )}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover "
                  />
                ) : null}
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm leading-[1.6] font-semibold text-[var(--black)]">
                    {item.name}
                  </span>
                  {typeof item.rate === "number" ? (
                    <span className="flex items-center gap-0.5 text-[12px] text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={
                            i < (item.rate ?? 0) ? faStarSolid : faStarRegular
                          }
                        />
                      ))}
                    </span>
                  ) : null}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
