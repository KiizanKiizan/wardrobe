import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { MemberIdContext } from "../../components/context/provider/ContextProvider";
import { NgCreateRequest } from "../../model/api/request/styling/ng/NgCreateRequest";
import { usePatchRequest } from "./UsePatchRequest";

type TNgUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse,
    unknown,
    (NgCreateRequest & { readonly memberId: number }) | undefined,
    unknown
  >;
  readonly isLoading: boolean;
};

type TNgsUpdateArg = NgCreateRequest & { readonly id: number };

export const useNgsUpdate = ({
  id,
  ngCategoryId,
  freeText,
  chartItemId,
  itemCategoryNg,
  sizeNg,
}: TNgsUpdateArg): TNgUpdate => {
  const params: NgCreateRequest & { readonly memberId: number } = {
    ngCategoryId,
    freeText,
    chartItemId,
    itemCategoryNg,
    sizeNg,
    memberId: useContextDefinedState(MemberIdContext),
  };
  const { mutate, isLoading } = usePatchRequest(`styling/ngs/${id}`, params);

  return { mutate, isLoading };
};
