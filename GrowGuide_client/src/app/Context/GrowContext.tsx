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

export const userContext = createContext<any>(undefined);

const GrowContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  const handleUser = async () => {
    const user = (await getUser()) as JwtPayload;
    setUser(user);
  };
  useEffect(() => {
    handleUser();

    return () => {
      console.log("cleanUp");
    };
  }, []);

  const contextValue: any = { user };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export const useGrowContext = () => {
  return useContext(userContext);
};

export default GrowContext;
