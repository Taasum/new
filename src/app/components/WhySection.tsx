// src/app/components/WhySection.tsx
export default function WhySection() {
  return (
    <section className="relative">
      <img
        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80"
        alt="Agriculture background"
        className="w-full h-[420px] object-cover brightness-75"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">Why AgriChain?</h2>
          <p className="mt-4 text-white/90 text-lg md:text-xl font-medium bg-white/0">
            AgriChain brings transparency across the supply chain — from farmer to consumer.
            Smart contracts, QR verification and IoT backed tracking ensure payments, quality and trust.
          </p>
        </div>
      </div>
    </section>
  );
}
