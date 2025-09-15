// src/app/components/HeroSlider.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1607872236386-c2b5d5026a91?auto=format&fit=crop&w=1350&q=80",
      alt: "Farmer in field",
    },
    {
      src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1350&q=80",
      alt: "Agriculture fields",
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1350&q=80",
      alt: "Market and consumer",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        className="h-[420px] md:h-[520px]"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-full object-cover brightness-90"
              />
              {/* Optional overlay text on first slide */}
              {i === 0 && (
                <div className="absolute inset-0 flex items-center pl-8 md:pl-20">
                  <div className="bg-white bg-opacity-30 backdrop-blur-sm p-4 rounded-md">
                    <h1 className="text-2xl md:text-4xl font-bold text-green-900">AgriChain — Trust in every step</h1>
                    <p className="mt-2 text-sm md:text-base text-green-900">Farm → Warehouse → Retail → Consumer</p>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
