// src/pages/Home.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import About from "../About/About";
import Services from "../../components/Services/Services";
import Features from "../Features/Features";
import Contact from "../Contact/Contact";
import { ThemeContext } from "../../context/ThemeContext";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  const handleWhatsAppClick = () => {
    window.open("https://wa.link/kc9ebt", "_blank");
  };

  return (
    <div className={`overflow-hidden transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-14 right-6 bg-[#25D366] p-4 rounded-full shadow-xl cursor-pointer transition-all duration-300 z-50"
      >
        <FaWhatsapp size={35} />
      </button>

      {/* HERO SECTION */}
      <section className={`relative min-h-screen flex items-center justify-center px-6 pt-24 pb-10 transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        {/* Background Glow */}
        <div className={`absolute inset-0 transition-colors duration-300 ${darkMode ? "bg-black" : "bg-white"}`}></div>

        <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 dark:bg-[#4F46E5]/20 blur-[130px] rounded-full top-10 left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-500/10 blur-[130px] rounded-full bottom-0 right-10"></div>

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
            className={`text-5xl md:text-6xl font-extrabold leading-tight ${
              darkMode ? "shimmer-text" : "text-black"
            }`}
          >
            Build. Scale. Automate.
            <br />
            <span className="text-[#4F46E5]">Your Digital Journey Begins Here.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`max-w-2xl mx-auto mt-6 text-lg transition-colors duration-300 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            I create high-performance MERN applications, dashboards, portfolios, and digital systems that help founders, brands, and businesses grow.
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
              onClick={() => (window.location.href = "/services")}
              className={`px-8 py-3 rounded-xl border font-medium transition ${
                darkMode
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-black/10 border-black/20 text-black hover:bg-black/20"
              }`}
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Sections */}
      <About darkMode={darkMode} />
      <Services darkMode={darkMode} />
      <Features darkMode={darkMode} />
      <Contact darkMode={darkMode} />

      {/* FOOTER */}
      <section className={`w-full py-16 mt-24 transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Motivational Line */}
          <div className="flex flex-col items-center text-center mb-12">
            <h2
              className={`text-3xl md:text-5xl font-extrabold mb-4 leading-tight max-w-4xl transition-colors duration-300 ${
                darkMode ? "shimmer-text" : "text-black"
              }`}
            >
              Code your vision. Scale your business.
              <span className="text-[#4F46E5]"> Own your future.</span>
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Build modern, fast, and scalable digital solutions designed to grow your business.
            </p>
          </div>

          <div className={`border-b my-10 transition-colors duration-300 ${darkMode ? "border-gray-700" : "border-gray-300"}`}></div>

          {/* Footer Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${darkMode ? "shimmer-text" : "text-black"}`}>
                YourBrand
              </h3>
              <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Creating high-performance websites, apps, dashboards, and tailored digital solutions for startups and businesses.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${darkMode ? "shimmer-text" : "text-black"}`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {["Home", "Services", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a href={`/${item.toLowerCase()}`} className="hover:text-[#4F46E5] transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${darkMode ? "shimmer-text" : "text-black"}`}>
                Contact
              </h3>
              <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Pimpri, Pune, Maharashtra</p>
              <p className={`mt-1 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Email: vyapaarsetu2025@gmail.com</p>
              <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Phone: +91 8177819283</p>

              <div className="flex items-center gap-4 mt-4 text-2xl">
                <a href="#" className="text-[#4F46E5] hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="#" className="text-[#4F46E5] hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="#" className="text-[#4F46E5] hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={`text-center pt-10 text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © {new Date().getFullYear()} VyapaarSetu — All Rights Reserved.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
