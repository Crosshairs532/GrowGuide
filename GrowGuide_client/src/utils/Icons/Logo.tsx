import React from "react";

const Logo = ({ width, height }: { width: string; height: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-shrub"
    >
      <path d="M12 22v-7l-2-2" />
      <path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0Z" />
      <path d="m14 14-2 2" />
    </svg>
  );
};

export default Logo;
