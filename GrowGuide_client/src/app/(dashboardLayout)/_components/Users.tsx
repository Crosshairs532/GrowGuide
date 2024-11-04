import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Avatar,
} from "@nextui-org/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Users = ({
  isPending,
  tabData,
}: {
  isPending: boolean;
  tabData: any;
}) => {
  return (
    <Table
      classNames={{
        wrapper: ["bg-transparent"],
      }}
      fullWidth
      isStriped
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn>{""}</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>profile</TableColumn>
      </TableHeader>
      <TableBody>
        {tabData?.map((data: any, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <Avatar src={`${data?.image}`} />
            </TableCell>
            <TableCell>
              <Skeleton isLoaded={!isPending}>{data?.name}</Skeleton>
            </TableCell>
            <TableCell>
              <Skeleton isLoaded={!isPending}> {data?.email}</Skeleton>
            </TableCell>
            <TableCell>
              <Link
                className=" duration-150 hover:text-[#0858BE]"
                href={`/profile/${data?._id}`}
              >
                <ExternalLink size={20} />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Users;
