import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
});

export function useTransactionsQuery({ filter, limit, offset }: any) {
  const { user } = useAuthContext();
  const token = user?.token;
  const email = user?.email;
  const fetchProducts = async () => {
    try {
      if (user == null) {
        return;
      }
      const { data, status } = await instance.get(
        `/?limit=${limit}&offset=${offset}&filter=${filter}`,
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
    ["transaction", { filter, limit, offset, email }],
    fetchProducts
  );

  return {
    transactionData: data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const createTransaction = useMutation(
    async (reqData: any) => {
      try {
        const { data, status } = await instance.post(
          `/`,
          {
            ...reqData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (status != 200) {
          toast.error("Something went wrong. Please try again.");
          throw new Error("Something went wrong. Please try again.");
        }

        if (data.error) {
          toast.error(data.error);
          throw new Error(data.error);
        }
        toast.success("Successfully created a new transaction");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["transaction"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = createTransaction;
  return {
    data,
    createTransaction: mutate,
    createTransactionisLoading: isLoading,
  };
}

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const updateTransaction = useMutation(
    async ({
      reqData,
      transactionID,
    }: {
      reqData: any;
      transactionID: string;
    }) => {
      try {
        const { data, status } = await instance.patch(
          `/${transactionID}`,
          {
            ...reqData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (status != 200) {
          toast.error("Something went wrong. Please try again.");
          throw new Error("Something went wrong. Please try again.");
        }

        if (data.error) {
          toast.error(data.error);
          throw new Error(data.error);
        }
        toast.success("Successfully updated transaction!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["transaction"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = updateTransaction;
  return {
    data,
    updateTransaction: mutate,
    updateTransactionisLoading: isLoading,
  };
}

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const deleteTransaction = useMutation(
    async ({ transactionID }: { transactionID: string }) => {
      try {
        const { data, status } = await instance.delete(`/${transactionID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (status != 200) {
          toast.error("Something went wrong. Please try again.");
          throw new Error("Something went wrong. Please try again.");
        }

        if (data.error) {
          toast.error(data.error);
          throw new Error(data.error);
        }
        toast.success("Successfully deleted transaction!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["transaction"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = deleteTransaction;
  return {
    data,
    deleteTransaction: mutate,
    deleteTransactionisLoading: isLoading,
  };
}
