import React from "react";

const ContactUs = () => {
  return (
    <div className=" bg-[#000000] py-4">
      <div className="container mx-auto px-4">
        {/* Contact Us Header */}
        <section className="text-center ">
          <h1 className="text-5xl font-extrabold text-[#E6E9EA]">Contact Us</h1>
        </section>

        {/* Contact Form */}
        <section className="contact-form">
          <div className="  shadow-lg rounded-lg p-8 max-w-lg mx-auto">
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C9BEF] focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C9BEF] focus:outline-none"
                  placeholder="Your email"
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C9BEF] focus:outline-none"
                  placeholder="Subject"
                />
              </div>

              <div className="mb-6">
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C9BEF] focus:outline-none"
                  placeholder="Your message"
                  rows={5}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C9BEF] text-white py-2 px-4 rounded-md font-semibold text-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Contact Information */}
        <section className="contact-info mt-1 text-center">
          <h2 className="text-3xl font-bold text-[#E6E9EA] mb-4">
            Or reach us directly
          </h2>
          <p className="text-lg text-[#000000] mb-2">
            Email:{" "}
            <a
              href="mailto:support@gardeningplatform.com"
              className="text-[#E6E9EA]"
            >
              support@gardeningplatform.com
            </a>
          </p>
          <p className="text-lg text-[#000000] mb-2">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-[#E6E9EA]">
              +1 234 567 890
            </a>
          </p>
          <p className="text-lg text-[#000000] mb-2">
            Address: 123 Garden Lane, Green City, GC 54321
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
