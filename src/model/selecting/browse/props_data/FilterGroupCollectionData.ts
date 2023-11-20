import { FormalRankRefinement } from "../FormalRankRefinement";
import { FilterCategoryGroupData } from "./FilterCategoryGroupData";
import { FilterCheckboxData } from "./FilterCheckboxData";
import { FilterMediaData } from "./FilterMediaData";
import { FilterPartSizeData } from "./FilterPartSizeData";
import { FilterSizeData } from "./FilterSizeData";

export interface FilterGroupCollectionData {
  readonly categoryData: FilterCategoryGroupData;
  readonly sizeData: FilterSizeData[];
  readonly partSizeData: FilterPartSizeData;
  readonly colorData: FilterMediaData[];
  readonly patternData: FilterMediaData[];
  readonly logoData: FilterMediaData[];
  readonly dropSizeData: FilterCheckboxData[];
  readonly formalRankData: FormalRankRefinement;
  readonly ngData: FilterCheckboxData[];
  readonly rankData: FilterCheckboxData[];
  readonly optionData: FilterCheckboxData[];
  readonly monthsData: FilterCheckboxData[];
}

export type TRentalFilterGroupCollectionData = Omit<
  FilterGroupCollectionData,
  "ngData" | "monthsData"
>;
