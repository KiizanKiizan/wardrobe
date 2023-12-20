import { FilterFormalRankResponse } from "./FilterFormalRankResponse";
import { FilterMediaResponse } from "./FilterMediaResponse";
import { FilterPartSizeResponse } from "./FilterPartSizeResponse";
import { FilterResponse } from "./FilterResponse";
import { LargeCategoryChoiceResponse } from "./LargeCategoryChoiceResponse";

export interface FilterChoiceResponse {
  readonly largeCategory: LargeCategoryChoiceResponse[];
  readonly size: FilterResponse[];
  readonly partSize: FilterPartSizeResponse;
  readonly color: FilterMediaResponse[];
  readonly pattern: FilterMediaResponse[];
  readonly logo: FilterMediaResponse[];
  readonly dropSize: FilterResponse[];
  readonly formalRank: FilterFormalRankResponse;
  readonly ng: FilterResponse[];
  readonly option: FilterResponse[];
  readonly rank: FilterResponse[];
  readonly months: number[];
}
