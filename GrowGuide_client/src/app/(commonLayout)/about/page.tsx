import React from "react";
import AboutPageUser from "./_components/AboutPageUser";

const AboutUs = () => {
  return (
    <div className=" py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-[#1C9BEF] mb-4">
            About Us
          </h1>
          <p className="mt-4 text-xl text-[#000000] max-w-2xl mx-auto">
            Welcome to the Gardening Tips & Advice Platform – your go-to
            community for gardening inspiration, expert advice, and the tools to
            make your gardening dreams a reality.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section mb-16">
          <div className="bg-[#202327] shadow-lg rounded-lg p-8 transition-transform hover:-translate-y-1">
            <h2 className="text-4xl font-semibold text-[#1C9BEF] mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-[#7D7D7D]">
              Our mission is to cultivate a community of gardeners who inspire
              and empower each other to grow sustainable, beautiful gardens. We
              aim to provide expert advice, resources, and a thriving community
              where members can share their successes and learn from others.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section mb-16">
          <div className="bg-[#202327] shadow-lg rounded-lg p-8 transition-transform hover:-translate-y-1">
            <h2 className="text-4xl font-semibold text-[#1C9BEF] mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-[#7D7D7D]">
              We envision a world where every individual, regardless of their
              experience level, has access to the knowledge and community
              support to grow a thriving garden. Through innovation and
              education, we aim to break down barriers to gardening for all.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section mb-16">
          <h2 className="text-4xl font-semibold text-[#7D7D7D] text-center mb-10">
            Meet the Team
          </h2>
          <AboutPageUser></AboutPageUser>
        </section>

        {/* Core Values Section */}
        <section className="values-section mb-16">
          <div className="bg-[#202327] shadow-lg rounded-lg p-8 transition-transform hover:-translate-y-1">
            <h2 className="text-4xl font-semibold text-[#1C9BEF] mb-4">
              Our Core Values
            </h2>
            <ul className="list-disc list-inside text-lg text-[#7D7D7D] mt-4">
              <li>Community: Fostering a sense of belonging and support.</li>
              <li>
                Sustainability: Encouraging eco-friendly gardening practices.
              </li>
              <li>
                Education: Empowering gardeners with actionable knowledge.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
