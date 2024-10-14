import { getData } from "@/services/profileService/profile.Service";
import { useQuery } from "@tanstack/react-query";

export const useGetTabData = (id: string, email: string, loading: boolean) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey: ["MY_POSTS", "LIKES", "FOLLOWERS", "FOLLOWING", "AUTH"],
    enabled: !loading,
    queryFn: async () => {
      const response: any = await getData(id, email);
      return response?.data;
    },
  });
  return { data, isPending, refetch, isFetching };
};
