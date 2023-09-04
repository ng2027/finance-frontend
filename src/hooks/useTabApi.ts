import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/tab`,
});

export function useTabsQuery({ borrowed, limit, offset }: any) {
  const { user } = useAuthContext();
  const token = user?.token;
  const email = user?.email;
  const fetchTabs = async () => {
    try {
      if (user == null) {
        return;
      }
      const { data, status } = await instance.get(
        `/?limit=${limit}&offset=${offset}&borrowed=${borrowed}`,
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
    ["tabs", { borrowed, limit, offset, email }],
    fetchTabs
  );

  return {
    tabData: data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}

export function useTabQuery({ tabId }: any) {
  const { user } = useAuthContext();
  const token = user?.token;

  const fetchTab = async () => {
    try {
      if (user == null) {
        return;
      }
      const { data, status } = await instance.get(`/${tabId}`, {
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
    ["tab", tabId],
    fetchTab
  );

  return {
    tabData: data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}

export function useCreateTabMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const createTab = useMutation(
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
        toast.success("Successfully created a new tab");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["tabs"]);
        queryClient.invalidateQueries(["tab"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = createTab;
  return {
    data,
    createTab: mutate,
    createTabisLoading: isLoading,
  };
}

export function useUpdateTabMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const updateTab = useMutation(
    async ({
      reqData,
      tabID,
      changeView,
    }: {
      reqData: any;
      tabID: string;
      changeView: Function;
    }) => {
      try {
        const { data, status } = await instance.patch(
          `/${tabID}`,
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
        toast.success("Successfully updated tab!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["tabs"]);
        queryClient.invalidateQueries(["tab", variables.reqData._id]);
        variables.changeView(variables.reqData.is_borrowed);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = updateTab;
  return {
    data,
    updateTab: mutate,
    updateTabisLoading: isLoading,
  };
}

export function useCloseTabMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const closeTab = useMutation(
    async ({ add, tabID }: { add: boolean; tabID: string }) => {
      try {
        const { data, status } = await instance.delete(
          `/${tabID}?add=${add}`,

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
        toast.success("Successfully closed tab!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["tabs"]);
        queryClient.invalidateQueries(["transaction"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = closeTab;
  return {
    data,
    closeTab: mutate,
    closeTabisLoading: isLoading,
  };
}
