import { getUserService } from "@/services/authService/auth.service";
import React from "react";

const getUser = async () => {
  const res = await getUserService();
  console.log(res);
  if (res) {
    return res;
  }
};

export default getUser;
