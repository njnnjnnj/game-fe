import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { getTasks, setCompleteTask } from "./fetcher";

enum QueryKeys {
  GET_TASKS = "GET_TASKS",
  SET_TASK_COMPLETE = "SET_TASK_COMPLETE",
}

export const useGetTasks = () =>
  useQuery({
    queryKey: [QueryKeys.GET_TASKS],
    queryFn: async () => getTasks(),
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useSetCompleteTask = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: [QueryKeys.SET_TASK_COMPLETE],
    mutationFn: async (id: string) => setCompleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_TASKS] });
      invalidateProfileQuery(queryClient);
    },
  });
