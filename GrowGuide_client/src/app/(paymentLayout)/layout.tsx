import React, { ReactNode } from "react";
import PremiumContext from "./_components/PremiumContext";

const PaymentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className=" border-2 min-h-screen">{children}</div>
    </>
  );
};

export default PaymentLayout;
