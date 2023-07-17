import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/user`,
});

export function useSignUp() {
  const [error, setError] = useState<any>(null);
  const [userError, setUserError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (signUpData: any) => {
    setIsLoading(true);
    setUserError(null);
    setError(null);
    setSuccess(false);
    try {
      const { data, status } = await instance.post(
        "/signup",
        { ...signUpData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (status !== 200) {
        setIsLoading(false);
        setError(data.error);
      }
      if (data.errorUser) {
        setUserError(data.errorUser);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setSuccess(true);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, userError, error, success };
}

export function useLogout() {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}

export function useLogin() {
  const [error, setError] = useState<any>(null);
  const [userError, setUserError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (signUpData: any) => {
    setIsLoading(true);
    setUserError(null);
    setSuccess(false);
    setError(null);

    try {
      const { data, status } = await instance.post(
        "/login",
        { ...signUpData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (status !== 200) {
        setIsLoading(false);
        setError(data.error);
      }
      if (data.errorUser) {
        setUserError(data.errorUser);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setSuccess(true);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return { login, isLoading, userError, error, success };
}
