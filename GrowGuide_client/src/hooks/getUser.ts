import { getUserService } from "@/services/authService/auth.service";
import React from "react";

const getUser = async () => {
  const res = await getUserService();

  if (res) {
    return res;
  }
};

export default getUser;
