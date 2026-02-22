import {createContext, useEffect, useState} from "react";
import {axiosInstance} from "@/lib/axios";
import Cookies from "js-cookie";
import type {User} from "@/types/user";
import type {LoginFormSchema} from "@/features/auth/forms/login";
import type {RegisterFormSchema} from "@/features/auth/forms/register";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isError: any;

  login: (values: LoginFormSchema) => Promise<any>;
  logout: () => void;
  register: (values: RegisterFormSchema) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  // cek user saat app pertama kali load
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    axiosInstance
      .get("/auth/profile")
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        console.log("PROFILE ERROR", err.response?.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (values: LoginFormSchema) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", values);

      const {accessToken, user} = res.data.data;

      Cookies.set("token", accessToken);

      setUser(user);
      setIsLoading(false);

      return res.data;
    } catch (error: any) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: RegisterFormSchema) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", values);

      const {accessToken, user} = res.data.data;
      Cookies.set("token", accessToken);

      setUser(user);
      setIsLoading(false);

      return res.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{user, isLoading, login, logout, register, isError}}>
      {children}
    </AuthContext.Provider>
  );
};
