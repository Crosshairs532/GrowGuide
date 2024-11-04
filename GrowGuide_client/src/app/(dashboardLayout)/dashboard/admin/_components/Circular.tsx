/* eslint-disable prettier/prettier */
"use client";
import { usePaymentchart } from "@/hooks/adminhooks/usepaymentchart";
import React from "react";
import {
  ResponsiveContainer,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
  BarChart,
  CartesianGrid,
} from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

const Circular = () => {
  const { data } = usePaymentchart();
  const formattedData = data?.map((item: any) => ({
    name: item._id.month,
    paymentCount: item._id.paymentCount,
    status: item._id.status,
  }));
  console.log(data);
  console.log(formattedData);
  return (
    <ResponsiveContainer className=" lg:w-[100%] w-[50%] h-[50%]">
      <BarChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="paymentCount" />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="paymentCount"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Circular;
