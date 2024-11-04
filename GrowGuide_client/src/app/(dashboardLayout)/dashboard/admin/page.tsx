import React from "react";
import ReactChart from "./_components/ReactChart";
import Circular from "./_components/Circular";

const AdminPage = () => {
  return (
    <div className=" h-screen py-6  lg:flex-row flex-col flex items-center  px-2 pt-4">
      <ReactChart />
      <Circular />
    </div>
  );
};

export default AdminPage;
