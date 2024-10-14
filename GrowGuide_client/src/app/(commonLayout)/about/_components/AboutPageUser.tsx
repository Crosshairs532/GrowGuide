"use client";
import { Avatar } from "@nextui-org/react";
import React from "react";

const AboutPageUser = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* Team Member 1 */}
      <div className="team-member text-center bg-[#333639] shadow-lg rounded-lg p-8 hover:shadow-2xl hover:bg-[#7d7d7d5a] transition duration-300">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="w-20 h-20 text-large"
        />
        <h3 className="text-2xl font-bold text-[#1C9BEF]">Alex Green</h3>
        <p className="text-[#7D7D7D]">Founder & Lead Gardener</p>
      </div>

      {/* Team Member 2 */}
      <div className="team-member text-center bg-[#333639] shadow-lg rounded-lg p-8 hover:shadow-2xl hover:bg-[#7d7d7d5a] transition duration-300">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="w-20 h-20 text-large"
        />
        <h3 className="text-2xl font-bold text-[#1C9BEF]">Sam Bloom</h3>
        <p className="text-[#7D7D7D]">Tech Lead & Developer</p>
      </div>

      {/* Team Member 3 */}
      <div className="team-member text-center bg-[#333639] shadow-lg rounded-lg p-8 hover:shadow-2xl hover:bg-[#7d7d7d5a] transition duration-300">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="w-20 h-20 text-large"
        />
        <h3 className="text-2xl font-bold text-[#1C9BEF]">Taylor Root</h3>
        <p className="text-[#7D7D7D]">Community Manager</p>
      </div>
    </div>
  );
};

export default AboutPageUser;
