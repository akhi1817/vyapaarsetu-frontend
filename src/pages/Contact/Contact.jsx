import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { motion } from "framer-motion"; // <-- Added
import API_ENDPOINTS from "../../config/api.js";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <section className="min-h-screen bg-[#0A0A0A] pt-24 pb-16 text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-bold mb-4 shimmer-text inline-block relative">
            Contact <span className="text-white/80">Us</span>
            <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-[#4F46E5] to-transparent"></span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a question or want to collaborate? We’d love to hear from you. 
            Let’s build your business’s digital bridge together.
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
              <h2 className="text-2xl font-semibold text-emerald-400 mb-3 shimmer-text">
                Let’s Talk Business
              </h2>
              <p className="text-gray-300 leading-relaxed">
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
                <HiLocationMarker className="w-8 h-8 text-[#4F46E5] shimmer-text mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white/90 shimmer-text">Office</h3>
                  <p className="text-gray-300">Pimpri, Pune, Maharashtra, India</p>
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
                <AiOutlineMail className="w-8 h-8 text-[#4F46E5] shimmer-text mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white/90 shimmer-text">Email</h3>
                  <a
                    href="mailto:vyapaarsetu2025@gmail.com"
                    className="text-[#c3c0f3] hover:underline"
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
                <AiOutlinePhone className="w-8 h-8 text-[#4F46E5] shimmer-text mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white/90 shimmer-text">Phone</h3>
                  <p className="text-gray-300">+91 8177819283</p>
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
            className="bg-[#111111] p-8 rounded-2xl shadow-lg border border-[#1F1F1F] hover:shadow-emerald-400/30 transition"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 font-medium mb-2 shimmer-text">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2 shimmer-text">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2 shimmer-text">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="5"
                  className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
                } text-white py-2 rounded-lg transition font-medium shimmer-text`}
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
