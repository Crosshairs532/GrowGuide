import { getUsers } from "@/services/profileService/profile.Service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllusers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res: any = await getUsers();
      return res?.data;
    },
  });
};
