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
      setIsLoading(!loading);
    }
    setUser(user);
  };
  useEffect(() => {
    handleUser();
    return () => {
      console.log("cleanUp");
    };
  }, []);

  const contextValue: any = { user, loading };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export const useGrowContext = () => {
  return useContext(userContext);
};

export default GrowContext;
