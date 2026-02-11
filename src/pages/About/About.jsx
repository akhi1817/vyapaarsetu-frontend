import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaUserTie, FaTools } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const aboutCards = [
  {
    icon: <FaUserTie className="w-12 h-12 text-[#4F46E5]" />, // shimmer conditional below
    title: "Who I Am",
    desc: "I am a MERN stack developer helping brands, startups, and founders bring their digital ideas to life. With clean code, smooth UX, and solid architecture — I build products that scale.",
  },
  {
    icon: <FaRocket className="w-12 h-12 text-[#4F46E5]" />,
    title: "My Vision",
    desc: "To empower businesses with modern, high-performance web solutions that help them grow, automate, and reach more customers worldwide.",
  },
  {
    icon: <FaCode className="w-12 h-12 text-[#4F46E5]" />,
    title: "What I Do",
    desc: "From portfolio websites to complete MERN applications — dashboards, admin panels, products, MVPs, and full digital solutions that make your business future-ready.",
  },
  {
    icon: <FaTools className="w-12 h-12 text-[#4F46E5]" />,
    title: "How I Work",
    desc: "Clear communication, milestone-based delivery, transparent workflow, and responsive support. Every project is crafted with attention to detail.",
  },
];

const About = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      id="about"
      className={`py-24 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-semibold mb-4 inline-block relative transition-colors duration-300 ${
              darkMode ? "shimmer-text" : "text-black"
            }`}
          >
            About Me
            <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#4F46E5] to-transparent"></span>
          </h2>
          <p
            className={`max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            I'm committed to building strong digital foundations for brands and founders.
            Clean UI, smooth experiences, and products engineered for performance — that's my craft.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {aboutCards.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
                darkMode ? "bg-gray-900" : "bg-gray-100"
              }`}
            >
              <div className="mb-4 flex justify-center">
                {React.cloneElement(item.icon, {
                  className: `${item.icon.props.className} ${
                    darkMode ? "shimmer-text" : ""
                  }`
                })}
              </div>
              <h3
                className={`text-xl font-semibold mb-2 relative text-center transition-colors duration-300 ${
                  darkMode ? "shimmer-text" : "text-black"
                }`}
              >
                {item.title}
                <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-[#4F46E5] to-transparent"></span>
              </h3>
              <p
                className={`leading-relaxed transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <p
            className={`text-lg leading-relaxed transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Whether you're building your first MVP, upgrading an existing system,
            or crafting your personal brand — I am here to make your digital journey smooth,
            functional, and future-proof.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
