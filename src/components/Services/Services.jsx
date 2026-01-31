import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaBriefcase, FaCubes, FaChartPie, FaMobileAlt, FaReact } from "react-icons/fa";

const services = [
  {
    title: "Website Development",
    desc: "Custom websites tailored for businesses, brands, and professional needs.",
    icon: <FaLaptopCode className="w-12 h-12 text-[#4F46E5] shimmer-text" />,
  },
  {
    title: "Portfolio Websites",
    desc: "Clean, modern portfolios for creators, freelancers, and professionals.",
    icon: <FaBriefcase className="w-12 h-12 text-[#4F46E5] shimmer-text" />,
  },
  {
    title: "Startup MVP",
    desc: "Build your startup’s Minimum Viable Product quickly using the MERN stack.",
    icon: <FaCubes className="w-12 h-12 text-[#4F46E5] shimmer-text" />,
  },
  {
    title: "Admin Dashboards",
    desc: "Powerful dashboards with analytics, charts, and full CRUD systems.",
    icon: <FaChartPie className="w-12 h-12 text-[#4F46E5] shimmer-text" />,
  },
  {
    title: "Responsive Design",
    desc: "Fully optimized UI for mobile, tablet, and desktop experiences.",
    icon: <FaMobileAlt className="w-12 h-12 text-[#4F46E5] shimmer-text" />,
  },
  {
    title: "MERN Stack Development",
    desc: "End-to-end solutions using MongoDB, Express, React, and Node.js.",
    icon: <FaReact className="w-12 h-12 text-[#4F46E5] shimmer-text" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}  
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4 shimmer-text inline-block relative">
            Client Services
            <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#4F46E5] to-transparent"></span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            High-quality MERN stack solutions tailored for businesses, creators, and startups.
          </p>
        </div>

        {/* SERVICES GRID — SAME UI AS FEATURES */}  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="p-8 bg-[#111111] rounded-2xl shadow-lg border border-[#1F1F1F] 
                         hover:border-[#4F46E5]/40 transition group flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 shimmer-text inline-block relative">
                {item.title}
                <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 
                                 w-16 h-0.5 bg-linear-to-r from-[#4F46E5] to-transparent"></span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
