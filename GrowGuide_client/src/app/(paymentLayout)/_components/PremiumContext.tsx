/* eslint-disable prettier/prettier */
"use client";
import { useGrowContext } from "@/app/Context/GrowContext";
import { useGetSingleUserPosts } from "@/hooks/useGetSingleUserPosts";
import { usePayment } from "@/hooks/usePayment";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const PremiumContext = () => {
  const { user } = useGrowContext();
  const { mutate: paymentInitialization, isPending, data } = usePayment();

  const router = useRouter();
  if (data) {
    // window.location.href = data.payment_url;
    window.open(data.payment_url, "_blank");
  }
  const { data: userPosts } = useGetSingleUserPosts(user?._id);

  const canUpGrade = (userPosts as any)?.data?.some(
    (post: any) => post?.votes >= 1
  );
  console.log(userPosts, user, canUpGrade);

  const handlePremium = () => {
    if (!canUpGrade) {
      return toast.warning("Atleast one should get upVote 1!");
    }
    paymentInitialization();
  };
  return (
    <div className="  h-screen relative flex justify-center items-center ">
      <div className=" cursor-pointer absolute left-4 top-4">
        <X onClick={() => router.back()} />
      </div>
      <div className=" absolute -top-[40%] left-[20%] w-[80%] h-[80%] -z-2 rounded-full bg-gradient-to-b from-[#202B3A] via-[#171E29] to-transparent blur-3xl "></div>
      <div className=" h-fit w-fit">
        <h1 className="text-center z-3 0 font-chirpBold text-6xl max-sm:text-5xl font-bold">
          Packages
        </h1>
        <div className=" z-20 flex justify-center items-center  sm:space-x-4 space-y-4 ">
          <div className=" z-20 space-y-3 text-xl mt-14 rounded-xl border border-[#9966FF]/25 bg-[#120d1d] p-10">
            <div className="text-[#9967FF] z-20">Premium</div>
            <div className=" flex font-chirpBold items-baseline my-5 gap-2 font-light">
              <h1 className=" text-3xl">BDT 100</h1>
              <small>/month</small>
            </div>
            <ul>
              <li className=" flex gap-2 text-sm">
                <Check />
                First Feature
              </li>
              <li className=" flex gap-2 text-sm">
                <Check />
                Second Feature
              </li>
              <li className=" flex gap-2 text-sm">
                <Check />
                Thired Feature
              </li>
            </ul>
            <button
              // disabled={canUpGrade}
              className=" bg-[#1E2938] px-4 py-2
               rounded-lg"
              onClick={handlePremium}
            >
              proceed To payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumContext;
