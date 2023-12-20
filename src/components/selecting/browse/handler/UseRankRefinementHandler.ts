import { FilterResponse } from "../../../../model/api/response/styling/browse/FilterResponse";
import { AppliedFilterData } from "../../../../model/selecting/browse/props_data/AppliedFilterData";
import { FilterCheckboxData } from "../../../../model/selecting/browse/props_data/FilterCheckboxData";
import { FilterCheckboxArrayCallback } from "../callback/FilterCheckboxArrayCallback";

export interface RankRefinementHandler {
  rankCallback: (choice: FilterResponse[], currentIds: number[]) => FilterCheckboxArrayCallback;
  rankData: (choice: FilterResponse[], currentIds: number[]) => FilterCheckboxData[];
  appliedFilters: (choice: FilterResponse[], currentIds: number[]) => AppliedFilterData[];
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const useRankRefinementHandler = (
  onChange: (newIds: number[]) => void,
): RankRefinementHandler => {
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

  const rankCallback = (
    choice: FilterResponse[],
    currentIds: number[],
  ): FilterCheckboxArrayCallback => {
    return {
      onClick: (index: number) => {
        const newRanks = newFilterArray(choice[index].id, currentIds);
        onChange(newRanks);
      },
    };
  };

  const rankData = (choice: FilterResponse[], currentIds: number[]): FilterCheckboxData[] => {
    return choice.map((filter) => {
      return {
        name: filter.name,
        isSelected: currentIds.includes(filter.id),
      };
    });
  };

  const appliedFilters = (choice: FilterResponse[], currentIds: number[]): AppliedFilterData[] => {
    return currentIds.map((currentId) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { name: choice.find((filter) => filter.id === currentId)!.name };
    });
  };

  const deleteFilter = (currentIds: number[], index: number) => {
    const newRanks = [...currentIds];
    newRanks.splice(index, 1);
    onChange(newRanks);
  };

  return {
    rankCallback,
    rankData,
    appliedFilters,
    deleteFilter,
  };
};
