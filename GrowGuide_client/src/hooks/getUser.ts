/* eslint-disable prettier/prettier */
import { getUserService } from "@/services/authService/auth.service";

const getUser = async () => {
  const res = await getUserService();

  if (res) {
    return res;
  }
};

export default getUser;
