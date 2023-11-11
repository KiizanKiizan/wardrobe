import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { baseUrl } from "./../../model/api/shared/BaseUrl";

export const usePatchRequest = <TParams = object, TError = AxiosError>(
  path: string,
  params?: TParams,
  afterMutation: {
    onSuccess?: () => Promise<unknown> | void;
    onError?: () => Promise<TError> | void;
  } = { onSuccess: () => undefined, onError: () => undefined },
) => {
  const { mutate, error, isLoading, isSuccess } = useMutation<
    AxiosResponse,
    TError,
    TParams | undefined
  >(
    path,
    (lateParams?: TParams) => axiosClient.patch(`${baseUrl()}/${path}`, lateParams ?? params),
    afterMutation,
  );

  return { mutate, error, isLoading, isSuccess };
};
