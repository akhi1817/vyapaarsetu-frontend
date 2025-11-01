import React from "react";
import { CheckCircle, ArrowRight, BarChart3, FileText, Boxes } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-linear-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Simplify Your <span className="text-emerald-600">Business Operations</span> with VyapaarSetu
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Manage inventory, automate GST reports, and grow your business with
              our modern, easy-to-use platform built for wholesalers and retailers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#features"
                className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1">
            <img
            src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
              alt="Business management illustration"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Trusted by growing businesses in multiple industries
          </h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <span>Retail</span>
            <span>Wholesale</span>
            <span>Jewellery</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-emerald-600 mb-12">
            Why Choose <span className="text-slate-800">VyapaarSetu</span>?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <Boxes className="w-10 h-10 text-emerald-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Smart Inventory
              </h3>
              <p className="text-gray-600">
                Manage your stock, categories, and purchase flow with ease — all in one dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <FileText className="w-10 h-10 text-emerald-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Automated GST Reports
              </h3>
              <p className="text-gray-600">
                Generate tax-ready reports automatically — stay compliant without extra effort.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <BarChart3 className="w-10 h-10 text-emerald-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Analytics & Growth
              </h3>
              <p className="text-gray-600">
                Get deep insights into your sales, purchases, and trends to make better decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white text-center">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to take your business online?
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
            Join VyapaarSetu and manage your inventory, billing, and e-commerce operations — all from one powerful platform.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
