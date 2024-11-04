/* eslint-disable prettier/prettier */
"use client";
import { useGetPaymentHistory } from "@/hooks/adminhooks/useGetPaymentHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const ManagePayment = () => {
  const { data, isPending } = useGetPaymentHistory();
  if (isPending) {
    return <p>loading...</p>;
  }

  console.log(data);
  return (
    <div>
      <h1 className=" font-chirpBold text-[4vw] text-center py-5">
        {" "}
        Payment - History
      </h1>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PAYMENT-STATUS</TableColumn>
          <TableColumn>TXN-ID</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((payment: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{payment?.userId?.name || "User deleted"}</TableCell>
              <TableCell>{payment?.paymentStatus}</TableCell>
              <TableCell>{payment?.transactionId}</TableCell>
              <TableCell>{payment?.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagePayment;
