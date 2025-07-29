import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'ZENTARA – Zero-Waste Exchange Platform',
  description: 'Sell waste, buy and sell eco-products sustainably.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-violet-100 flex flex-col items-center py-8">

      {/* Logo */}
      <Image
        src="/ZENTARA.jpg"
        alt="Zentara Logo"
        width={1380}
        height={180}
        priority
        className="mb-4"
      />

      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-center mt-4">Welcome to Z.E.N.T.A.R.A. </h1>
      <p className="text-lg text-gray-600 text-center mt-2 w-4/5 md:w-1/2">
        India’s first zero-waste exchange platform empowering users to sell, buy, and upcycle sustainably.
      </p>

      {/* Action Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-6 md:px-20 w-full">

        {/* Sell Waste Section */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
          <Image src="/Sell Waste.png" alt="Sell Waste" width={600} height={150} className="rounded-lg mb-4" />
          <h3 className="font-bold text-xl">♻️ Sell Your Waste</h3>
          <p className="text-sm mt-2 text-gray-600">Get rewarded for segregated waste. Schedule pickups, track impact, and reduce landfill.</p>
          <Link href="/sell-waste" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Start Selling</Link>
        </div>

        {/* Buy Eco-Friendly Products Section */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
          <Image src="/Buy Products.png" alt="Buy Eco Products" width={300} height={150} className="rounded-lg mb-4" />
          <h3 className="font-bold text-xl">🛍️ Buy Eco-Friendly Products</h3>
          <p className="text-sm mt-2 text-gray-600">Browse handpicked sustainable alternatives and contribute to a cleaner planet.</p>
          <Link href="/buy-products" className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700">Shop Now</Link>
        </div>

        {/* Sell Eco-Friendly Products Section */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
          <Image src="/Sell products.png" alt="Sell Eco Products" width={550} height={350} className="rounded-lg mb-4" />
          <h3 className="font-bold text-xl">📦 Sell Eco-Products</h3>
          <p className="text-sm mt-2 text-gray-600">Join as an eco-entrepreneur. List products, reach green consumers, and grow your brand.</p>
          <Link href="/sell-products" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Start Selling</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 w-full bg-white py-6 text-center text-sm text-gray-600 border-t">
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link href="/about">About Z.E.N.T.A.R.A.</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/help">Help</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} ZENTARA All rights reserved</p>
      </footer>
    </main>
  );
}
