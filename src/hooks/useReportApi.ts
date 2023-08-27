import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/report`,
});

export function useReportQuery({
  category,
  year,
  month,
  isSpent,
}: {
  category: string;
  year: number;
  month: number;
  isSpent: boolean;
}) {
  console.log(isSpent);
  const { user } = useAuthContext();
  const token = user?.token;
  const email = user?.email;
  const fetchReport = async () => {
    try {
      if (user == null) {
        return;
      }
      const { data, status } = await instance.get(
        `/?category=${category}&year=${year.toString()}&month=${month.toString()}&isSpent=${isSpent}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    ["report", { category, year, month, email, isSpent }],
    fetchReport
  );

  return {
    data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}
