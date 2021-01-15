import FilterResponse from "../../../../model/api/response/styling/browse/FilterResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterSizeData from "../../../../model/styling/browse/props_data/FilterSizeData";
import FilterSizeArrayCallback from "../callback/FilterSizeArrayCallback";

export interface SizeRefinementHandler {
  sizeCallback: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterSizeArrayCallback;
  sizeData: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterSizeData[];
  appliedFilters: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
}

export const useSizeRefinementHandler = (
  callback: (newIds: number[]) => void
): SizeRefinementHandler => {
  const newFilterArray = (id: number, currentArray: number[]): number[] => {
    const currentIndex = currentArray.indexOf(id);
    const newArray = [...currentArray];
    if (currentIndex === -1) {
      newArray.push(id);
    } else {
      newArray.splice(currentIndex, 1);
    }
    return newArray;
  };

  const sizeCallback = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterSizeArrayCallback => {
    return {
      onClick: (index: number) => {
        const newSizes = newFilterArray(choice[index].id, currentIds);
        callback(newSizes);
      },
    };
  };

  const sizeData = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterSizeData[] => {
    return choice.map((filter) => {
      return {
        name: filter.name,
        isSelected: currentIds.includes(filter.id),
      };
    });
  };

  const appliedFilters = (
    choice: FilterResponse[],
    currentIds: number[]
  ): AppliedFilterData[] => {
    return choice
      .filter((filter) => currentIds.includes(filter.id))
      .map((filter) => {
        return { name: filter.name };
      });
  };

  return {
    sizeCallback,
    sizeData,
    appliedFilters,
  };
};