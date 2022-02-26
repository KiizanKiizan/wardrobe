import { usePatchRequest } from "./UsePatchRequest";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

export const useItemFeedbacksUpdate = (
  chartItemId: number,
  textFeedback: string
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isSuccess: boolean;
  isLoading: boolean;
} => {
  const params = { textFeedback };
  const { mutate, isSuccess, isLoading } = usePatchRequest(
    `item_feedbacks/${chartItemId}`,
    params
  );
  return { mutate, isSuccess, isLoading };
};