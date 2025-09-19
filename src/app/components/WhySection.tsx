export default function WhySection() {
  return (
    <section className="relative">
      <img
       src="/img3.png"
      className="w-full h-[420px] object-cover brightness-75"
      />
                      
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">Why AgriChain?</h2>
          <p className="mt-4 text-white/90 text-lg md:text-xl font-medium bg-white/0">
               AgriChain brings transparency across the supply chain — from farmer to consumer. 
               Smart contracts, QR verification and IoT-backed tracking ensure payments, quality and trust. 
               By combining blockchain integrity with real-time monitoring, we empower farmers with fair and 
               instant payments while protecting consumers from fraud.  
               Every crop’s journey — from sowing to storage to sale — is recorded immutably, 
               ensuring accountability at every stage of the agricultural ecosystem.
</p>

        </div>
      </div>
    </section>
  );
}
