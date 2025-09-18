// File: src/app/components/ExploreSection.tsx
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaSeedling, FaWarehouse, FaShoppingCart } from "react-icons/fa";

export default function ExploreSection() {
  const items = [
    {
      key: "farmer",
      title: "Farmers",
      subtitle: "List crops · Track payments · Get verified",
      href: "/dashboard/farmer",
      img: "/images/hero-farm.jpg",
      icon: FaSeedling,
    },
    {
      key: "warehouse",
      title: "Warehouses",
      subtitle: "Storage · Monitoring · Accept crops",
      href: "/dashboard/warehouse",
      img: "/images/hero-warehouse.jpg",
      icon: FaWarehouse,
    },
    {
      key: "consumer",
      title: "Consumers",
      subtitle: "Scan QR · Browse produce · Buy with trust",
      href: "/dashboard/consumer",
      img: "/images/hero-market.jpg",
      icon: FaShoppingCart,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Explore AgriChain</h2>
        <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          Click any circle or the Explore box below it to open the corresponding dashboard.
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {items.map((it) => (
            <SwiperSlide key={it.key}>
              <div className="flex flex-col items-center gap-6 py-10">
                {/* 🔹 Circle (clickable) */}
                <Link
                  href={it.href}
                  className="rounded-full w-40 h-40 overflow-hidden ring-4 ring-white shadow-xl hover:scale-105 transition"
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* 🔹 Explore Box (clickable) */}
                <Link
                  href={it.href}
                  className="bg-white rounded-xl shadow-md px-6 py-4 text-center hover:bg-green-600 hover:text-white transition font-medium w-64"
                >
                  <div className="flex flex-col items-center gap-2">
                    <it.icon className="text-2xl" />
                    <span className="text-lg">{`Explore ${it.title}`}</span>
                    <p className="text-sm opacity-80">{it.subtitle}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
