/* eslint-disable prettier/prettier */
"use client";
import { useGetAllusers } from "@/hooks/useGetAllUsers";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { useDeleteUser } from "@/hooks/adminhooks/useDeleteUser";

const ManageUser = () => {
  const {
    data,
    isPending,
    isSuccess,
    isFetching,
    refetch: refetchAllUser,
  } = useGetAllusers();

  const { mutate, isPending: deleting } = useDeleteUser();

  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user?.image }}
            description={user?.email}
            name={cellValue}
          >
            {user?.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip color="danger" content="Delete user">
              <Button
                onClick={() => mutate(user?._id)}
                className={` text-lg text-danger cursor-pointer active:opacity-50`}
              >
                {deleting ? "deleting.." : <DeleteIcon />}
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isPending) {
    return <p>loading...</p>;
  }

  console.log(data);
  return (
    <div className=" px-5">
      <h1 className=" font-chirpBold text-[4vw] text-center py-9">Users</h1>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={(item as any)?._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUser;
