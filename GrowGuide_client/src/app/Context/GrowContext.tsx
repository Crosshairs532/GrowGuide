"use client";
import getUser from "@/hooks/getUser";
import { TUser } from "@/types";
import { JwtPayload } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const userContext = createContext<any>(null);

const GrowContext = ({ children }: { children: ReactNode }) => {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState<JwtPayload | null | undefined>(null);

  const handleUser = async () => {
    const user = await getUser();
    if (user) {
      setIsLoading(false);
      setUser(user);
    }
  };
  useEffect(() => {
    handleUser();
  }, [loading]);

  const contextValue: any = {
    user,
    loading,
    setUser,
    handleUser,
    setIsLoading,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export const useGrowContext = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useGrowContext must be used within a GrowContext");
  }
  return context;
};

export default GrowContext;
