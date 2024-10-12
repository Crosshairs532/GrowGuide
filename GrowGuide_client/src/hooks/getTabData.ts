import { getData } from "@/services/profileService/profile.Service";
import { useQuery } from "@tanstack/react-query";

export const useGetTabData = (id: string, email: string, loading: boolean) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey: ["MY_POSTS", "LIKES", "FOLLOWERS", "FOLLOWING"],
    enabled: !loading,
    queryFn: async () => {
      const response = await getData(id, email);
      return response?.data;
    },
  });
  return { data, isPending, refetch, isFetching };
};
