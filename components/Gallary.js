"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function EmblaCarousel({ li }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="embla w-full mx-auto" ref={emblaRef}>
      <div className="embla__container">
        {li.map((item, i) => (
          <div
            key={i}
            className="embla__slide flex items-center justify-center relative w-full sm:h-130 md:h-140 h-80"
          >
            <Image
              src={item}
              alt={`gallery-photo-${i}`}
              fill={true}
              className="object-contain"
              // Optionally add priority or placeholder props here
              // priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
