import React, { useState, useContext } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { motion } from "framer-motion";
import API_ENDPOINTS from "../../config/api.js";
import { ThemeContext } from "../../context/ThemeContext";

const Contact = () => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.SEND_MESSAGE, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen pt-24 pb-16 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1
            className={`text-4xl font-bold mb-4 inline-block relative transition-colors duration-300 ${
              darkMode ? "shimmer-text" : "text-black"
            }`}
          >
            Contact <span className="text-[#4F46E5]/80">Us</span>
            <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#4F46E5] to-transparent"></span>
          </h1>
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-300 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Have a question or want to collaborate? We’d love to hear from you. Let’s build your business’s digital bridge together.
          </p>
        </motion.div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${
                darkMode ? "shimmer-text" : "text-black"
              }`}>
                Let’s Talk Business
              </h2>
              <p className={`leading-relaxed transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                Whether you’re a wholesaler, retailer, or entrepreneur, VyapaarSetu
                can help you digitize your business operations — from inventory
                to billing and beyond. Drop us a message and we’ll get back soon!
              </p>
            </div>

            <div className="space-y-6">

              {/* Office */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <HiLocationMarker className={`w-8 h-8 mt-1 ${darkMode ? "text-[#4F46E5] shimmer-text" : "text-[#4F46E5]"}`} />
                <div>
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? "shimmer-text" : "text-black"}`}>Office</h3>
                  <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Pimpri, Pune, Maharashtra, India</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <AiOutlineMail className={`w-8 h-8 mt-1 ${darkMode ? "text-[#4F46E5] shimmer-text" : "text-[#4F46E5]"}`} />
                <div>
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? "shimmer-text" : "text-black"}`}>Email</h3>
                  <a
                    href="mailto:vyapaarsetu2025@gmail.com"
                    className="hover:underline transition-colors duration-300 text-[#c3c0f3]"
                  >
                    vyapaarsetu2025@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <AiOutlinePhone className={`w-8 h-8 mt-1 ${darkMode ? "text-[#4F46E5] shimmer-text" : "text-[#4F46E5]"}`} />
                <div>
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? "shimmer-text" : "text-black"}`}>Phone</h3>
                  <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>+91 8177819283</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-lg border transition-colors duration-300 ${
              darkMode ? "bg-gray-900 border-gray-800 hover:shadow-emerald-400/30" : "bg-gray-100 border-gray-300 hover:shadow-emerald-400/30"
            }`}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              {["name", "email", "message"].map((field) => (
                <div key={field}>
                  <label className={`block font-medium mb-2 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-black"}`}>
                    {field === "name" ? "Your Name" : field === "email" ? "Your Email" : "Message"}
                  </label>
                  {field !== "message" ? (
                    <input
                      type={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      className={`w-full border rounded-lg px-4 py-2 transition-colors duration-300 ${
                        darkMode ? "bg-black/20 border-gray-700 text-white focus:ring-emerald-400" : "bg-white border-gray-300 text-black focus:ring-emerald-400"
                      } focus:outline-none focus:ring-2`}
                      required
                    />
                  ) : (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      rows="5"
                      className={`w-full border rounded-lg px-4 py-2 transition-colors duration-300 ${
                        darkMode ? "bg-black/20 border-gray-700 text-white focus:ring-emerald-400" : "bg-white border-gray-300 text-black focus:ring-emerald-400"
                      } focus:outline-none focus:ring-2`}
                      required
                    ></textarea>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-medium transition-colors duration-300 ${
                  darkMode ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
