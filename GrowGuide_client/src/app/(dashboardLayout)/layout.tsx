import React, { ReactNode } from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import TabsPage from "./_components/TabsPage";

const DashboardLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col">
      <DashboardSidebar />
      <div className=" px-3 flex flex-col min-h-screen ml-[10vh]  sm:ml-[20vh] ">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayoutPage;
