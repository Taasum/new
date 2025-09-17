
"use client";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-900 to-black text-white mt-10">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About + Logo */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* Leaf + Chain Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-9 h-9 text-green-400"
            >
              <path d="M12 2C7 2 2 7 2 12s5 10 10 10c4.97 0 10-5 10-10S17 2 12 2zm1 17.93V20h-2v-.07c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93z" />
            </svg>
            <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              AgriChain
            </h2>
          </div>

          <p className="text-sm opacity-80 leading-relaxed mb-4">
            A blockchain-powered agricultural supply chain solution ensuring
            transparency, instant farmer payments, and consumer trust.
          </p>
          <p className="text-xs italic opacity-70">
            Empowering Farmers • Connecting Consumers • Securing the Future
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/register" className="hover:text-green-300 transition">Register</a></li>
            <li><a href="/login" className="hover:text-green-300 transition">Login</a></li>
            <li><a href="/dashboard" className="hover:text-green-300 transition">Dashboard</a></li>
            <li><a href="/about" className="hover:text-green-300 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-green-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/docs" className="hover:text-green-300 transition">Documentation</a></li>
            <li><a href="/faqs" className="hover:text-green-300 transition">FAQs</a></li>
            <li><a href="/policy" className="hover:text-green-300 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-green-300 transition">Terms & Conditions</a></li>
            <li><a href="/support" className="hover:text-green-300 transition">Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-green-300" /> 
              Bhubaneswar, Odisha, India
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-green-300" /> 
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MdEmail className="text-green-300" /> 
              support@agrichain.in
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition">
              <FaInstagram />
            </a>
            <a href="https://github.com" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-950 py-5 text-center text-xs md:text-sm border-t border-green-700">
        <p className="mb-2">
          © {new Date().getFullYear()} <span className="font-semibold">AgriChain</span>.  
          All Rights Reserved.
        </p>
        <p className="opacity-80">
          🌍 Made with ❤️ in India • Powered by Blockchain • AI
        </p>
      </div>
    </footer>
  );
}

// "use client";
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-200 px-8 py-12 mt-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
//         {/* Brand Section */}
//         <div>
//           <div className="flex items-center gap-2 mb-4">
//             {/* Leaf Logo */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//               className="w-8 h-8 text-green-400"
//             >
//               <path d="M12 2C7 2 2 7 2 12s5 10 10 10c4.97 0 10-5 10-10S17 2 12 2zm1 17.93V20h-2v-.07c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93z" />
//             </svg>
//             <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
//               AgriChain
//             </h2>
//           </div>

//           <p className="text-sm opacity-80 leading-relaxed mb-4">
//             A blockchain-powered agricultural supply chain solution designed
//             to ensure transparency, fair farmer payments, and consumer trust.
//           </p>
//           <p className="text-xs italic opacity-70">
//             Empowering Farmers • Connecting Consumers • Securing the Future
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-green-400">
//             Quick Links
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-green-400 cursor-pointer">Home</li>
//             <li className="hover:text-green-400 cursor-pointer">About Us</li>
//             <li className="hover:text-green-400 cursor-pointer">Farmer Portal</li>
//             <li className="hover:text-green-400 cursor-pointer">Consumer Portal</li>
//             <li className="hover:text-green-400 cursor-pointer">Warehouse Portal</li>
//           </ul>
//         </div>

//         {/* Resources */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-green-400">
//             Resources
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-green-400 cursor-pointer">Documentation</li>
//             <li className="hover:text-green-400 cursor-pointer">Help Center</li>
//             <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
//             <li className="hover:text-green-400 cursor-pointer">Terms & Conditions</li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-green-400">Contact</h3>
//           <ul className="space-y-2 text-sm">
//             <li>Email: support@agrichain.gov.in</li>
//             <li>Helpline: +91 1800-123-456</li>
//             <li>Address: Krushi Bhavan, Bhubaneswar, Odisha</li>
//           </ul>
//           <div className="flex gap-4 mt-4">
//             {/* Socials */}
//             <a href="#" className="hover:text-green-400">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="#" className="hover:text-green-400">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="#" className="hover:text-green-400">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm opacity-70">
//         © {new Date().getFullYear()} AgriChain. All rights reserved.  
//         <span className="block md:inline md:ml-2">
//           Designed for Government of Odisha – Agriculture Transparency
//         </span>
//       </div>
//     </footer>
//   );
// }

