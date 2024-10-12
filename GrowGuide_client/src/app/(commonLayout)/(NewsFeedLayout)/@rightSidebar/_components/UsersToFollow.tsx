"use client";
import { Button, User } from "@nextui-org/react";
import React from "react";

const UsersToFollow = () => {
  let users = [
    <User
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />,
    <User
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />,
    <User
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />,
    <User
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />,
  ];
  return (
    <div className=" grid grid-cols-1 gap-3">
      {users.map((user) => (
        <div className=" flex items-center  justify-between ">
          {user} <Button>Follow</Button>
        </div>
      ))}
    </div>
  );
};

export default UsersToFollow;
