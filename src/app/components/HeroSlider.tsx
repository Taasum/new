"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      src: "https://img.freepik.com/premium-photo/agriculture-asian-farmer-using-mobile-phone-check-fresh-green-corn-s-sprouts-soil-maize-spring-field_61243-1800.jpg"
    },
    {
      src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1350&q=80",
      alt: "Agriculture fields",
    },
    {
      src: "https://media.istockphoto.com/id/855984178/photo/wegetables-in-a-warehouse.jpg?s=612x612&w=0&k=20&c=Ngxxnne6DQIaafBHhqU26D_ahOu6ez4mYE_Uo90K4D0=",
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
