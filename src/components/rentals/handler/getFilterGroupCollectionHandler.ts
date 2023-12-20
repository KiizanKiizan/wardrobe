/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { FilterChoiceResponse } from "../../../hooks/api/UseRentalFilters";
import { LargeCategoryChoiceResponse } from "../../../model/api/response/styling/browse/LargeCategoryChoiceResponse";
import { FormalRankRefinement } from "../../../model/selecting/browse/FormalRankRefinement";
import { Refinement } from "../../../model/selecting/browse/Refinement";
import { FilterCategoryGroupData } from "../../../model/selecting/browse/props_data/FilterCategoryGroupData";
import { TRentalFilterGroupCollectionData } from "../../../model/selecting/browse/props_data/FilterGroupCollectionData";
import { FilterCategoryGroupCallback } from "../../selecting/browse/callback/FilterCategoryGroupCallback";
import { FilterCheckboxArrayCallback } from "../../selecting/browse/callback/FilterCheckboxArrayCallback";
import { TRentalFilterGroupCollectionCallback } from "../../selecting/browse/callback/FilterGroupCollectionCallback";
import { FilterSizeArrayCallback } from "../../selecting/browse/callback/FilterSizeArrayCallback";

type TArgs = {
  filter: FilterChoiceResponse;
  currentRefinement: Refinement;
  onChangeCurrentRefinement: (refinement: Refinement) => void;
};
export const getFilterGroupCollectionHandler = ({
  filter,
  currentRefinement,
  onChangeCurrentRefinement,
}: TArgs) => {
  // 現在の大カテを返す
  const getCurrentLargeCategory = (): LargeCategoryChoiceResponse | undefined => {
    return filter.largeCategory.find((c) => c.id === currentRefinement.largeCategoryId);
  };
  const getBroaderCategory = () => {
    if (currentRefinement.mediumCategoryId) {
      // 中カテが既に指定されている場合
      return null;
    } else {
      if (currentRefinement.largeCategoryId) {
        // 大カテが既に指定されている場合
        const selectedLargeCategory = getCurrentLargeCategory();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return selectedLargeCategory!!.mediumCategory.map((filter) => {
          return { name: filter.name };
        });
      } else {
        return filter.largeCategory.map((filter) => {
          return { name: filter.name };
        });
      }
    }
  };

  const getSmallCategory = () => {
    const selectedLargeCategory = getCurrentLargeCategory();
    const selectedMediumCategory = selectedLargeCategory?.mediumCategory.find(
      (c) => c.id === currentRefinement.mediumCategoryId,
    );
    if (selectedMediumCategory) {
      return selectedMediumCategory.smallCategory.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.smallCategoryIds.includes(filter.id),
        };
      });
    } else {
      return [];
    }
  };

  const getCategory = (): FilterCategoryGroupData => {
    return {
      broaderCategoryData: getBroaderCategory(),
      smallCategoryData: getSmallCategory(),
    };
  };

  // 全ての絞り込みデータを返す
  const getGroupCollection = (): TRentalFilterGroupCollectionData => {
    return {
      categoryData: getCategory(),
      sizeData: filter.size.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.sizeIds.includes(filter.id),
        };
      }),
      partSizeData: {
        selectedPresetIndex: null,
        presets: [],
        sliders: filter.rangesOfPartSizes.map((partSize) => {
          return {
            key: partSize.id,
            name: partSize.name,
            range: [partSize.min, partSize.max],
            selectedValue: [
              currentRefinement.partSizes.find((value) => value.id === partSize.id)?.min ??
                partSize.min,
              currentRefinement.partSizes.find((value) => value.id === partSize.id)?.max ??
                partSize.max,
            ],
          };
        }),
      },
      colorData: filter.color.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.colorIds.includes(filter.id),
          imagePath: filter.imagePath,
        };
      }),
      patternData: filter.pattern.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.patternIds.includes(filter.id),
          imagePath: filter.imagePath,
        };
      }),
      logoData: filter.logo.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.logoIds.includes(filter.id),
          imagePath: filter.imagePath,
        };
      }),
      dropSizeData: filter.dropSize.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.dropSizes.includes(filter.id),
        };
      }),
      formalRankData: currentRefinement.formalRank,
      rankData: filter.rank.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.rankIds.includes(filter.id),
        };
      }),
      optionData: filter.option.map((filter) => {
        return {
          name: filter.name,
          isSelected: currentRefinement.optionIds.includes(filter.id),
        };
      }),
    };
  };

  const handleBroaderCategoryClick = (index: number) => {
    if (currentRefinement.largeCategoryId) {
      const selectedLargeCategory = getCurrentLargeCategory();
      if (selectedLargeCategory) {
        const newId = selectedLargeCategory.mediumCategory[index].id;
        const newRefinement = {
          ...currentRefinement,
          mediumCategoryId: newId,
          pageNo: 1,
        };
        onChangeCurrentRefinement(newRefinement);
      }
    } else {
      const newId = filter.largeCategory[index].id;
      const newRefinement = {
        ...currentRefinement,
        largeCategoryId: newId,
        pageNo: 1,
      };
      onChangeCurrentRefinement(newRefinement);
    }
  };

  const getBroaderCategoryCallback = () => {
    return {
      onClick: (index: number) => handleBroaderCategoryClick(index),
    };
  };

  const handleSmallCategoryClick = (index: number) => {
    const largeCategoryChoice = getCurrentLargeCategory();
    const mediumCategoryChoice = largeCategoryChoice?.mediumCategory.find(
      (elem) => elem.id === currentRefinement.mediumCategoryId,
    );
    if (mediumCategoryChoice) {
      const smallCategoryChoice = mediumCategoryChoice.smallCategory[index];
      const currentIndex = currentRefinement.smallCategoryIds.indexOf(smallCategoryChoice.id);
      const newIds = [...currentRefinement.smallCategoryIds];
      if (currentIndex === -1) {
        newIds.push(smallCategoryChoice.id);
      } else {
        newIds.splice(currentIndex, 1);
      }
      const newRefinement = {
        ...currentRefinement,
        smallCategoryIds: newIds,
        pageNo: 1,
      };
      onChangeCurrentRefinement(newRefinement);
    }
  };
  const handleCategoryBackButtonClick = () => {
    const newRefinement = {
      ...currentRefinement,
      mediumCategoryId: null,
      smallCategoryIds: [],
      pageNo: 1,
    };
    onChangeCurrentRefinement(newRefinement);
  };

  const getSmallCategoryCallback = (): FilterCheckboxArrayCallback => {
    return {
      onClick: (index: number) => handleSmallCategoryClick(index),
      onClickBackButton: handleCategoryBackButtonClick,
    };
  };

  const getCategoryCallback = (): FilterCategoryGroupCallback => {
    return {
      broaderCategoryCallback: getBroaderCategoryCallback(),
      smallerCategoryCallback: getSmallCategoryCallback(),
    };
  };

  const getSizeCallback = (): FilterSizeArrayCallback => {
    return {
      onClick: (index: number) => {
        const selectedId = filter.size[index].id;
        const currentIndex = currentRefinement.sizeIds.indexOf(selectedId);
        const newIds = [...currentRefinement.sizeIds];
        if (currentIndex === -1) {
          newIds.push(selectedId);
        } else {
          newIds.splice(currentIndex, 1);
        }
        const newRefinement = {
          ...currentRefinement,
          sizeIds: newIds,
          pageNo: 1,
        };
        onChangeCurrentRefinement(newRefinement);
      },
    };
  };

  const getPartSizeCallback = () => {
    return {
      onPresetChanged: () => undefined,
      filterSliderArrayCallback: {
        onChange: (index: number, value: number[]) => {
          const currentIndex = currentRefinement.partSizes.findIndex(
            (partSize) => partSize.id === filter.rangesOfPartSizes[index].id,
          );
          const newPartSizes = [...currentRefinement.partSizes];
          const newValue = {
            id: filter.rangesOfPartSizes[index].id,
            min: value[0],
            max: value[1],
          };
          if (currentIndex === -1) {
            newPartSizes.push(newValue);
          } else {
            newPartSizes.splice(currentIndex, 1, newValue);
          }
          const newRefinement = {
            ...currentRefinement,
            partSizes: newPartSizes,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
    };
  };

  // 全ての絞り込みのコールバックを返す
  const getFilterCallback = (): TRentalFilterGroupCollectionCallback => {
    return {
      categoryCallback: getCategoryCallback(),
      sizeCallback: getSizeCallback(),
      partSizeCallback: getPartSizeCallback(),
      colorCallback: {
        onClick: (index: number) => {
          const selectedId = filter.color[index].id;
          const currentIndex = currentRefinement.colorIds.indexOf(selectedId);
          const newIds = [...currentRefinement.colorIds];
          if (currentIndex === -1) {
            newIds.push(selectedId);
          } else {
            newIds.splice(currentIndex, 1);
          }
          const newRefinement = {
            ...currentRefinement,
            colorIds: newIds,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
      patternCallback: {
        onClick: (index: number) => {
          const selectedId = filter.pattern[index].id;
          const currentIndex = currentRefinement.patternIds.indexOf(selectedId);
          const newIds = [...currentRefinement.patternIds];
          if (currentIndex === -1) {
            newIds.push(selectedId);
          } else {
            newIds.splice(currentIndex, 1);
          }
          const newRefinement = {
            ...currentRefinement,
            patternIds: newIds,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
      logoCallback: {
        onClick: (index: number) => {
          const selectedId = filter.logo[index].id;
          const currentIndex = currentRefinement.logoIds.indexOf(selectedId);
          const newIds = [...currentRefinement.logoIds];
          if (currentIndex === -1) {
            newIds.push(selectedId);
          } else {
            newIds.splice(currentIndex, 1);
          }
          const newRefinement = {
            ...currentRefinement,
            logoIds: newIds,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
      dropSizeCallback: {
        onClick: (index: number) => {
          const selectedId = filter.dropSize[index].id;
          const currentIndex = currentRefinement.dropSizes.indexOf(selectedId);
          const newIds = [...currentRefinement.dropSizes];
          if (currentIndex === -1) {
            newIds.push(selectedId);
          } else {
            newIds.splice(currentIndex, 1);
          }
          const newRefinement = {
            ...currentRefinement,
            dropSizes: newIds,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
      formalRankCallback: (value: FormalRankRefinement) => {
        const newRefinement = {
          ...currentRefinement,
          formalRank: value,
          pageNo: 1,
        };
        onChangeCurrentRefinement(newRefinement);
      },
      rankCallback: {
        onClick: (index: number) => {
          const selectedId = filter.rank[index].id;
          const currentIndex = currentRefinement.rankIds.indexOf(selectedId);
          const newIds = [...currentRefinement.rankIds];
          if (currentIndex === -1) {
            newIds.push(selectedId);
          } else {
            newIds.splice(currentIndex, 1);
          }
          const newRefinement = {
            ...currentRefinement,
            rankIds: newIds,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
      optionCallback: {
        onClick: (index: number) => {
          const selectedId = filter.option[index].id;
          const currentIndex = currentRefinement.optionIds.indexOf(selectedId);
          const newIds = [...currentRefinement.optionIds];
          if (currentIndex === -1) {
            newIds.push(selectedId);
          } else {
            newIds.splice(currentIndex, 1);
          }
          const newRefinement = {
            ...currentRefinement,
            optionIds: newIds,
            pageNo: 1,
          };
          onChangeCurrentRefinement(newRefinement);
        },
      },
      onItemIdChanged: (newId: number) => {
        let newRefinement;
        if (newId) {
          newRefinement = {
            ...currentRefinement,
            itemId: newId,
            pageNo: 1,
          };
        } else {
          newRefinement = {
            ...currentRefinement,
            itemId: null,
            pageNo: 1,
          };
        }
        onChangeCurrentRefinement(newRefinement);
      },
    };
  };

  return {
    filterCollection: getGroupCollection(),
    filterCollectionCallback: getFilterCallback(),
  };
};
