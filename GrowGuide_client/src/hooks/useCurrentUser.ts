/* eslint-disable prettier/prettier */
import { getData } from "@/services/profileService/profile.Service";
import { useQuery } from "@tanstack/react-query";

// !current user form the db using the token id
export const useCurrentUser = (id: string, loading: boolean) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey: ["current_user"],
    enabled: !loading,
    queryFn: async () => {
      const response: any = await getData(id);
      return response?.data;
    },
  });
  return { data, isPending, refetch, isFetching };
};
