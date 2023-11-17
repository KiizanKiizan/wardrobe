import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { GetIndexFilterParams } from "../../model/api/request/styling/browse/GetIndexFilterParams";
import { GetIndexParams } from "../../model/api/request/styling/browse/GetIndexParams";
import { BrowseIndexResponse } from "../../model/api/response/styling/browse/BrowseIndexResponse";
import { Refinement } from "./../../model/selecting/browse/Refinement";
import { useGetRequest } from "./UseGetRequest";

type BrowsesIndex = {
  readonly data?: BrowseIndexResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<BrowseIndexResponse, Error>>;
  readonly isFetching: boolean;
};

type TBrowsesIndexArg = { refinement: Refinement; chartId?: number };

export const useBrowsesIndex = ({ refinement, chartId }: TBrowsesIndexArg): BrowsesIndex => {
  const params = (): GetIndexParams => {
    const filterParams: GetIndexFilterParams = {
      smallCategory: refinement.smallCategoryIds,
      size: refinement.sizeIds,
      partSize: refinement.partSizes,
      color: refinement.colorIds,
      pattern: refinement.patternIds,
      logo: refinement.logoIds,
      dropSize: refinement.dropSizes,
      formalRank: {
        min: refinement.formalRank.min ?? 1,
        max: refinement.formalRank.max ?? 10,
      },
      ng: refinement.ngIds,
      option: refinement.optionIds,
      rank: refinement.rank,
    };
    if (refinement.mediumCategoryId) filterParams.mediumCategory = refinement.mediumCategoryId;
    if (refinement.largeCategoryId) filterParams.largeCategory = refinement.largeCategoryId;
    if (refinement.itemId) filterParams.itemId = refinement.itemId;

    return {
      chartId: chartId,
      sort: refinement.sortId,
      page_no: refinement.pageNo,
      filter: filterParams,
    };
  };

  const { data, error, refetch, isFetching } = useGetRequest<BrowseIndexResponse>(
    "styling/browses",
    params(),
    `styling/browses${JSON.stringify(params())}`,
  );

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
