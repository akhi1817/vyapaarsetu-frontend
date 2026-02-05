import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import About from "../About/About";
import Services from '../../components/Services/Services';
import Contact from '../Contact/Contact';
import Features from '../Features/Features';
import { FaWhatsapp } from "react-icons/fa";

// Import your internal components


const Home = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.link/kc9ebt", "_blank");
  };

  return (
    <div className="bg-[#0A0A0A] text-white overflow-hidden">

      {/* WhatsApp Floating Button */}
<button
  onClick={() => window.open("https://wa.link/kc9ebt", "_blank")}
  className="
    fixed bottom-6 right-6 
    bg-[#25D366] 
    text-white 
    p-4 
    rounded-full 
    shadow-xl 
    cursor-pointer 
    transition-all duration-300 
    z-99999
  "
>
  <FaWhatsapp size={35} />
</button>



      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-10">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-[#111] via-[#0A0A0A] to-black"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#4F46E5]/20 blur-[130px] rounded-full top-10 left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full bottom-0 right-10"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight shimmer-text"
          >
            Build. Scale. Automate.
            <br />
            <span className="text-[#4F46E5] shimmer-text">Your Digital Journey Begins Here.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg"
          >
            I create high-performance MERN applications, dashboards, portfolios, 
            and digital systems that help founders, brands, and businesses grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => (window.location.href = "/contact")}
              className="px-8 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] transition flex items-center gap-2 text-white font-medium shadow-lg hover:shadow-[#4F46E5]/40"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => (window.location.href = "/about")}
              className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition text-white font-medium"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <About />

      {/* SERVICES SECTION */}
      <Services/>

      {/* FEATURES SECTION */}
      <Features />

      {/* CONTACT SECTION */}
      <Contact />

      {/* Footer */}
      {/* ================= FOOTER SECTION ================= */}
<section className="w-full bg-[#0D0D0D] text-gray-300 py-16 mt-24">
  <div className="max-w-6xl mx-auto px-6">

   {/* Motivational Line (Hero-style) */}
    <div className="flex flex-col items-center text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fadeInUp leading-tight max-w-4xl">
        Code your vision. Scale your business.
        <span className="text-[#4F46E5]">  Own your future.</span>
      </h2>
      <p className="text-gray-400 text-lg md:text-xl max-w-3xl animate-fadeIn delay-200">
        Build modern, fast, and scalable digital solutions designed to grow your business.
      </p>
    </div>


    {/* Divider */}
    <div className="border-b border-gray-700 my-10"></div>

    {/* Footer Grid */}
    <div className="grid md:grid-cols-3 gap-12">

      {/* Brand */}
      <div>
        <h3 className="text-xl font-bold text-white mb-3">YourBrand</h3>
        <p className="text-gray-400">
          Creating high-performance websites, apps, dashboards,
          and tailored digital solutions for startups and businesses.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="/services" className="hover:text-white transition">Services</a></li>
          <li><a href="/about" className="hover:text-white transition">About</a></li>
          <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
        <p className="text-gray-400">Pimpri, Pune, Maharashtra</p>
        <p className="text-gray-400 mt-1">Email: vyapaarsetu2025@gmail.com</p>
        <p className="text-gray-400">Phone: +91 8177819283</p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-4 text-2xl">
          <a href="#" className="text-[#4F46E5] hover:text-white transition">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" className="text-[#4F46E5] hover:text-white transition">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#" className="text-[#4F46E5] hover:text-white transition">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>

    </div>

    {/* Bottom */}
    <div className="text-center text-gray-500 pt-10 text-sm">
      © {new Date().getFullYear()} VyapaarSetu — All Rights Reserved.
    </div>

  </div>
</section>

    </div>
  );
};

export default Home;
