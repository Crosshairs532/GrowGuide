/* eslint-disable prettier/prettier */
"use client";

import { adminDeleteUser } from "@/services/adminService/adminDeleteUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: any) => {
      const res = await adminDeleteUser(id);

      return (res as any)?.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
