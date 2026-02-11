import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Zap, Code, MessageCircle, Layers, ShieldCheck } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const points = [
  {
    title: "Affordable Pricing",
    desc: "We provide cost-effective plans that deliver premium quality without stretching your budget.",
    icon: <span className="text-4xl font-bold text-[#4F46E5]">₹</span> // shimmer removed in light mode
  },
  {
    title: "Fast & Smooth Experience",
    desc: "Lightning-fast performance with seamless navigation for a smoother workflow.",
    icon: <Zap className="w-10 h-10 text-[#4F46E5]" />
  },
  {
    title: "Professional Quality",
    desc: "Pixel-perfect, production-ready solutions crafted with modern UI/UX standards.",
    icon: <Code className="w-10 h-10 text-[#4F46E5]" />
  },
  {
    title: "Friendly Communication",
    desc: "We keep everything simple, clear, and supportive throughout the project journey.",
    icon: <MessageCircle className="w-10 h-10 text-[#4F46E5]" />
  },
  {
    title: "Custom-Tailored Solutions",
    desc: "Every feature is shaped around your exact business requirements—no cookie-cutter work.",
    icon: <Layers className="w-10 h-10 text-[#4F46E5]" />
  },
  {
    title: "Reliable & Long-Term Support",
    desc: "We stay available for updates, fixes, and improvements whenever your business grows.",
    icon: <ShieldCheck className="w-10 h-10 text-[#4F46E5]" />
  },
];

const Features = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      id="why-us"
      className={`py-24 transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-semibold mb-4 inline-block relative transition-colors duration-300 ${
              darkMode ? "shimmer-text" : "text-black"
            }`}
          >
            Why Choose Us?
            <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#4F46E5] to-transparent"></span>
          </h2>
          <p className={`max-w-2xl mx-auto mt-4 leading-relaxed transition-colors duration-300 ${
            darkMode ? "text-gray-300" : "text-black"
          }`}>
            We deliver high-quality, reliable, and professional solutions tailored for your business.
          </p>
        </div>

        {/* GRID CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg border transition-colors duration-300 group flex flex-col items-center text-center ${
                darkMode
                  ? "bg-gray-900 border-gray-800 hover:border-[#4F46E5]/40 text-white"
                  : "bg-gray-100 border-gray-300 hover:border-[#4F46E5]/40 text-black"
              }`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3
                className={`text-xl font-semibold mb-2 inline-block relative transition-colors duration-300 ${
                  darkMode ? "shimmer-text" : "text-black"
                }`}
              >
                {item.title}
                <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-[#4F46E5] to-transparent"></span>
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-black"
              }`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
