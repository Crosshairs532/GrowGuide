import React, { Suspense } from "react";
import UsersToFollow from "./_components/UsersToFollow";

const RightBar = () => {
  const quotes = [
    {
      id: 1,
      quote: "To plant a garden is to believe in tomorrow.",
      author: "Audrey Hepburn",
    },
    {
      id: 2,
      quote: "Gardening adds years to your life and life to your years.",
      author: "Unknown",
    },
  ];
  return (
    <div className=" pt-[2vh] -top-[50%] sticky  space-y-4 px-4">
      <div className=" px-4 py-2 min-h-[50vh] z-10 border border-[#2F3336] rounded-3xl">
        <h1 className=" font-chirpBold  p-2 ">Who To follow</h1>
        <UsersToFollow />
      </div>

      <div className=" px-4 py-2 min-h-[50vh] border-[#2F3336] z-10 border rounded-3xl">
        <h1 className=" p-2 font-chirpBold text-[2vw]">Quotes</h1>
        <div>
          {quotes.map((quote, idx) => (
            <div className=" space-y-3" key={idx}>
              <p>{quote.quote}</p>
              <small className=" italic text-[#71767A]">{quote.author}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
