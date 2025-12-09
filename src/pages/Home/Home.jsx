import React from "react";
import { ArrowRight, BarChart3, FileText, Boxes } from "lucide-react";

const Home = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.link/srp48t", "_blank");
  };

  return (
    <div className="bg-gray-50 relative animate-fadeIn">
      {/* WhatsApp Floating Button */}
    <div
  onClick={handleWhatsAppClick}
  className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] p-3 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-300 z-999 animate-wp flex items-center justify-center"
  title="Chat on WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="40px"
    height="40px"
    fill="white"
    className="drop-shadow-lg"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12c0 1.938.551 3.766 1.588 5.355L2 22l4.777-1.543A9.935 9.935 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 
      18a7.951 7.951 0 0 1-4.271-1.238l-.305-.184-2.836.915.935-2.77-.195-.313A7.951 7.951 0 0 1 4 
      12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 
      8zm3.671-5.639c-.2-.1-1.181-.582-1.364-.648-.183-.067-.316-.1-.449.1s-.515.648-.631.782-.233.15-.433.05c-.2-.1-.843-.31-1.604-.99a6.027 
      6.027 0 0 1-1.115-1.385c-.117-.2-.013-.308.088-.407.09-.089.2-.233.3-.35.1-.117.133-.2.2-.333.067-.133.033-.25-.017-.35-.05-.1-.449-1.081-.616-1.481-.162-.389-.327-.336-.449-.341-.117-.005-.25-.005-.383-.005a.739.739 
      0 0 0-.533.25c-.183.2-.7.683-.7 1.665s.717 1.935.816 2.066c.1.133 1.409 2.15 3.418 
      3.012.478.206.85.328 1.141.419.478.15.914.129 
      1.257.078.383-.057 1.181-.482 1.348-.948.167-.467.167-.867.117-.948-.05-.084-.183-.133-.383-.233z" />
  </svg>
</div>


      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-linear-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-slideUp">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight animate-fadeUp">
              Simplify Your <span  className="text-emerald-600">Business Operations</span> with VyapaarSetu
            </h1>

            <p className="text-gray-600 mb-6 text-lg opacity-0 animate-fadeInSlow">
              Manage inventory, automate GST reports, and grow your business with
              our modern, easy-to-use platform built for wholesalers and retailers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => (window.location.href = "/login")}
className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition transform flex items-center justify-center gap-2 animate-cta"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("features");
                  el && el.scrollIntoView({ behavior: "smooth" });
                }}
className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition transform flex items-center justify-center gap-2 animate-cta"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 animate-float-strong">
  <img
    src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
    alt="Business"
    className="w-full rounded-2xl shadow-xl border border-white/30"
  />
</div>

        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-12 bg-white border-t border-gray-100 animate-fadeIn">
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
      <section id="features" className="py-20 bg-gray-50 animate-fadeInSlow">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-emerald-600 mb-12">
            Why Choose <span className="text-slate-800">VyapaarSetu</span>?
          </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {[
    { icon: Boxes, title: "Smart Inventory", text: "Manage your stock..." },
    { icon: FileText, title: "Automated GST Reports", text: "Generate tax-ready reports..." },
    { icon: BarChart3, title: "Analytics & Growth", text: "Get deep insights..." }
  ].map((f, i) => (
    <div
      key={i}
      className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-[1.03] card-animate"
      style={{ animationDelay: `${i * 0.25}s` }}
    >
      <f.icon className="w-10 h-10 text-emerald-600 mb-4 mx-auto" />
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{f.title}</h3>
      <p className="text-gray-600">{f.text}</p>
    </div>
  ))}
</div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white text-center animate-fadeInSlow">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-bold mb-4">Ready to take your business online?</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
            Join VyapaarSetu and manage your inventory, billing, and e-commerce operations — all from one powerful platform.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
