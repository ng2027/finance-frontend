import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/category`,
});

export function useCategoriesQuery() {
  const { user } = useAuthContext();
  const token = user?.token;

  const fetchCategory = async () => {
    try {
      if (user == null) {
        return;
      }
      const { data, status } = await instance.get(`/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status !== 200) {
        toast.error("Something went wrong. Please try again.");
        throw new Error("Something went wrong. Please try again.");
      }

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      throw new Error((error as any)?.message);
    }
  };
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery(
    ["category"],
    fetchCategory
  );

  return {
    data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}
