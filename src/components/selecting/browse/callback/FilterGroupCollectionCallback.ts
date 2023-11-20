import { FormalRankRefinement } from "../../../../model/selecting/browse/FormalRankRefinement";
import { FilterCategoryGroupCallback } from "./FilterCategoryGroupCallback";
import { FilterCheckboxArrayCallback } from "./FilterCheckboxArrayCallback";
import { FilterMediaArrayCallback } from "./FilterMediaArrayCallback";
import { FilterPartSizeCallback } from "./FilterPartSizeCallback";
import { FilterSizeArrayCallback } from "./FilterSizeArrayCallback";

export interface FilterGroupCollectionCallback {
  categoryCallback: FilterCategoryGroupCallback;
  sizeCallback: FilterSizeArrayCallback;
  partSizeCallback: FilterPartSizeCallback;
  colorCallback: FilterMediaArrayCallback;
  patternCallback: FilterMediaArrayCallback;
  logoCallback: FilterMediaArrayCallback;
  dropSizeCallback: FilterCheckboxArrayCallback;
  formalRankCallback: (value: FormalRankRefinement) => void;
  ngCallback: FilterCheckboxArrayCallback;
  rankCallback: FilterCheckboxArrayCallback;
  optionCallback: FilterCheckboxArrayCallback;
  onItemIdChanged: (newId: number) => void;
  monthsCallback: FilterCheckboxArrayCallback;
}

export type TRentalFilterGroupCollectionCallback = Omit<
  FilterGroupCollectionCallback,
  "ngCallback" | "monthsCallback"
>;
