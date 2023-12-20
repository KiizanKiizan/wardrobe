import { GetDetailFilterParams } from "../../model/api/request/styling/browse/GetDetailFilterParams";
import { GetDetailParams } from "../../model/api/request/styling/browse/GetDetailParams";
import { DetailResponse } from "../../model/api/response/styling/browse/DetailResponse";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { useGetRequest } from "./UseGetRequest";

type BrowsesDetail = {
  readonly data?: DetailResponse;
  readonly error: Error | null;
  readonly isFetching: boolean;
};

type TBrowsesDetailArg = {
  chartId?: number;
  preregisteredItemId: number;
  refinement: Refinement;
};

export const useBrowsesDetail = ({
  chartId,
  preregisteredItemId,
  refinement,
}: TBrowsesDetailArg): BrowsesDetail => {
  const params = (): GetDetailParams => {
    const filterParams: GetDetailFilterParams = {
      size: refinement.sizeIds,
      partSize: refinement.partSizes,
      ng: refinement.ngIds,
      ranks: refinement.rankIds,
    };

    if (refinement.itemId) filterParams.itemId = refinement.itemId;

    return {
      chartId: chartId,
      preregisteredItemId: preregisteredItemId,
      filter: filterParams,
    };
  };

  const { data, error, isFetching } = useGetRequest<DetailResponse>(
    "styling/browses/detail",
    params(),
  );

  return {
    data,
    error,
    isFetching,
  };
};
