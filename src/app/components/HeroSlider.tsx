"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      src: "/img5.png"
    },
    {
      src: "/img8.png",
      alt: "Agriculture fields",
    },
    {
      src: "/img10.png",
      alt: "Market and consumer",
    },
  ];

  return (
    <div className="w-full relative">
      {/* Swiper slides */}
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        className="h-[420px] md:h-[520px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover brightness-75"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* AgriChain overlay text - fixed across all slides */}
      <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-20 pointer-events-none">
        <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold text-green-900 drop-shadow">
            AgriChain
          </h1>
          <p className="mt-2 text-lg md:text-xl text-green-800">
            Trust in Every Step
          </p>
          <p className="mt-1 text-sm md:text-base text-green-900 font-medium">
            Farm → Warehouse → Retail → Consumer
          </p>
        </div>
      </div>
    </div>
  );
}
