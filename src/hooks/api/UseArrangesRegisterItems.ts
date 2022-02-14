import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePostRequest } from "./UsePostRequest";
import { PostRegisterItemsParamsParams } from "../../model/api/request/styling/arrange/PostRegisterItemsParams";

type TArrangesRegisterItemsArg = PostRegisterItemsParamsParams;

export const useArrangesRegisterItems = ({
  adminId,
  chartId,
  itemIds,
}: TArrangesRegisterItemsArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
} => {
  const params = (): PostRegisterItemsParamsParams => {
    return {
      chartId: chartId,
      adminId: adminId,
      itemIds: itemIds,
    };
  };

  const { mutate, error, isLoading } = usePostRequest(
    "arranges/register_items",
    params()
  );

  return {
    mutate,
    error,
    isLoading,
  };
};
