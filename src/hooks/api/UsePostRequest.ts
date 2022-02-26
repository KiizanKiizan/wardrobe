import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { AxiosResponse } from "axios";
import { UseMutateFunction, useMutation } from "react-query";

export const usePostRequest = (
  path: string,
  params: {},
  afterMutation: {
    onSuccess: () => Promise<unknown> | void;
    onError: () => Promise<unknown> | void;
  } = { onSuccess: () => {}, onError: () => {} }
): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isIdle: boolean;
} => {
  const { mutate, error, isLoading, isSuccess, isIdle } = useMutation<
    any,
    Error
  >(
    () => axiosClient.post(`${baseUrl()}/styling/${path}`, params),
    afterMutation
  );

  return { mutate, error, isLoading, isSuccess, isIdle };
};