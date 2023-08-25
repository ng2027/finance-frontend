import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/subscription`,
});

export function useSubscriptionsQuery({ filter, limit, offset }: any) {
  const { user } = useAuthContext();
  const token = user?.token;
  const email = user?.email;
  const fetchSubscriptions = async () => {
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
    ["subscriptions", { filter, limit, offset, email }],
    fetchSubscriptions
  );

  return {
    subscriptionData: data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}

export function useCreateSubscriptionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const createSubscription = useMutation(
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
        toast.success("Successfully created a new subscription");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["subscriptions"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = createSubscription;
  return {
    data,
    createSubscription: mutate,
    createSubscriptionisLoading: isLoading,
  };
}

export function useUpdateSubscriptionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const updateSubscription = useMutation(
    async ({
      reqData,
      subscriptionID,
    }: {
      reqData: any;
      subscriptionID: string;
    }) => {
      try {
        const { data, status } = await instance.patch(
          `/${subscriptionID}`,
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
        toast.success("Successfully updated subscription!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["subscriptions"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = updateSubscription;
  return {
    data,
    updateSubscription: mutate,
    updateSubscriptionisLoading: isLoading,
  };
}

export function useDeleteSubscriptionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const deleteSubscription = useMutation(
    async ({ subscriptionID }: { subscriptionID: string }) => {
      try {
        const { data, status } = await instance.delete(`/${subscriptionID}`, {
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
        toast.success("Successfully deleted subscription!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["subscriptions"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = deleteSubscription;
  return {
    data,
    deleteSubscription: mutate,
    deleteSubscriptionisLoading: isLoading,
  };
}

export function useUpcomingSubscriptionsQuery({ limit, offset }: any) {
  const { user } = useAuthContext();
  const token = user?.token;
  const email = user?.email;
  const fetchUpcoming = async () => {
    try {
      if (user == null) {
        return;
      }
      const { data, status } = await instance.get(
        `/upcoming?limit=${limit}&offset=${offset}`,
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
    ["upcomingSubscription", { limit, offset, email }],
    fetchUpcoming
  );

  return {
    upcomingData: data,
    error,
    isLoading: isLoading,
    isError: isError,
  };
}

export function useCloseSubscriptionMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const token = user?.token;
  const closeSubscription = useMutation(
    async ({
      add,
      subscriptionID,
    }: {
      add: boolean;
      subscriptionID: string;
    }) => {
      try {
        const { data, status } = await instance.patch(
          `/${subscriptionID}/close`,
          {
            add,
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
        toast.success("Successfully closed upcoming subscription!");
        return data;
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        throw new Error((error as any)?.message);
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["upcomingSubscription"]);
        queryClient.invalidateQueries(["subscriptions"]);
        queryClient.invalidateQueries(["transaction"]);
      },
    }
  );

  const { data, mutate, isLoading, isError, error } = closeSubscription;
  return {
    data,
    closeSubscription: mutate,
    closeSubscriptionisLoading: isLoading,
  };
}
