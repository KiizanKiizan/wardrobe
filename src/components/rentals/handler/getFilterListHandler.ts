import { FilterChoiceResponse } from "../../../hooks/api/UseRentalFilters";
import { LargeCategoryChoiceResponse } from "../../../model/api/response/styling/browse/LargeCategoryChoiceResponse";
import { TRentalAppliedFilterData, TType } from "../../../model/rental/TRentalAppliedFilterData";
import { Refinement } from "../../../model/selecting/browse/Refinement";

type TArgs = {
  readonly filter: FilterChoiceResponse;
  readonly currentRefinement: Refinement;
  readonly defaultRefinement: Refinement;
  readonly categoryId: number;
  readonly onChangeCurrentRefinement: (refinement: Refinement) => void;
};
export const getFilterListHandler = ({
  filter,
  currentRefinement,
  defaultRefinement,
  categoryId,
  onChangeCurrentRefinement,
}: TArgs) => {
  const appliedCategoryFilter = (): TRentalAppliedFilterData[] => {
    const selectedLargeCategory = filter.largeCategory.find(
      (c) => c.id === categoryId,
    ) as LargeCategoryChoiceResponse;

    const selectedMediumCategory = selectedLargeCategory.mediumCategory.find(
      (c) => c.id === currentRefinement.mediumCategoryId,
    );

    if (selectedMediumCategory && currentRefinement.smallCategoryIds.length) {
      return currentRefinement.smallCategoryIds.map((sId) => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: selectedMediumCategory.smallCategory.find((filter) => filter.id === sId)!.name,
          type: "smallCategory",
          id: sId,
        };
      });
    }
    if (selectedMediumCategory)
      return [
        {
          name: selectedMediumCategory.name,
          type: "mediumCategory",
          id: selectedMediumCategory.id,
        },
      ];
    else if (selectedLargeCategory)
      return [
        {
          name: selectedLargeCategory.name,
          type: "largeCategory",
          id: categoryId,
        },
      ];
    else return [];
  };

  const appliedSizeFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.sizeIds.map((sizeId) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: filter.size.find((size) => size.id === sizeId)!.name,
        type: "size",
        id: sizeId,
      };
    });
  };

  const appliedPartSizeFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.partSizes.map((p) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const partSizeName = filter.rangesOfPartSizes.find((partSize) => partSize.id === p.id)!.name;
      return {
        name: `${partSizeName} ${p.min}〜${p.max}`,
        type: "partSize",
        id: p.id,
      };
    });
  };

  const appliedColorFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.colorIds.map((colorId) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: filter.color.find((color) => color.id === colorId)!.name,
        type: "color",
        id: colorId,
      };
    });
  };

  const appliedPatternFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.patternIds.map((patternId) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: filter.pattern.find((pattern) => pattern.id === patternId)!.name,
        type: "pattern",
        id: patternId,
      };
    });
  };

  const appliedLogoFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.logoIds.map((logoId) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: filter.logo.find((logo) => logo.id === logoId)!.name,
        type: "logo",
        id: logoId,
      };
    });
  };

  const appliedFormaRankFilter = (): TRentalAppliedFilterData[] => {
    return [
      {
        name: `キレイ度${currentRefinement.formalRank.min}~${currentRefinement.formalRank.max}`,
        type: "formalRank",
        id: 0,
      },
    ];
  };

  const appliedRankFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.rankIds.map((rankId: number) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: filter.rank.find((rank) => rank.id === rankId)!.name,
        type: "rank",
        id: rankId,
      };
    });
  };
  const appliedOptionFilter = (): TRentalAppliedFilterData[] => {
    return currentRefinement.optionIds.map((optionId) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: filter.option.find((option) => option.id === optionId)!.name,
        type: "option",
        id: optionId,
      };
    });
  };
  const appliedFilterArrayData = (): TRentalAppliedFilterData[] => {
    const itemId: TRentalAppliedFilterData[] = currentRefinement.itemId
      ? [{ name: `${currentRefinement.itemId}`, type: "itemId", id: 0 }]
      : [];
    const categories = appliedCategoryFilter();
    const sizes = appliedSizeFilter();
    const partSizes = appliedPartSizeFilter();
    const color = appliedColorFilter();
    const patterns = appliedPatternFilter();
    const logo = appliedLogoFilter();
    const formalRanks = appliedFormaRankFilter();
    const ranks = appliedRankFilter();
    const options = appliedOptionFilter();

    return [
      ...itemId,
      ...categories,
      ...sizes,
      ...partSizes,
      ...color,
      ...patterns,
      ...logo,
      ...formalRanks,
      ...ranks,
      ...options,
    ];
  };

  const handleClickClear = () => {
    onChangeCurrentRefinement(defaultRefinement);
  };

  const handleClickDelete = ({ id, type }: { id: number; type: TType }) => {
    switch (type) {
      case "itemId":
        onChangeCurrentRefinement({
          ...currentRefinement,
          itemId: null,
          pageNo: 1,
        });
        break;
      case "smallCategory":
        onChangeCurrentRefinement({
          ...currentRefinement,
          smallCategoryIds: currentRefinement.smallCategoryIds.filter((sId) => sId !== id),
        });
        break;
      case "mediumCategory":
      case "largeCategory":
        onChangeCurrentRefinement({
          ...currentRefinement,
          mediumCategoryId: null,
          smallCategoryIds: [],
        });
        break;
      case "size":
        onChangeCurrentRefinement({
          ...currentRefinement,
          sizeIds: currentRefinement.sizeIds.filter((sId) => sId !== id),
        });
        break;
      case "partSize":
        onChangeCurrentRefinement({
          ...currentRefinement,
          partSizes: currentRefinement.partSizes.filter((p) => p.id !== id),
        });
        break;
      case "color":
        onChangeCurrentRefinement({
          ...currentRefinement,
          colorIds: currentRefinement.colorIds.filter((cId) => cId !== id),
        });
        break;
      case "pattern":
        onChangeCurrentRefinement({
          ...currentRefinement,
          patternIds: currentRefinement.patternIds.filter((pId) => pId !== id),
        });
        break;
      case "logo":
        onChangeCurrentRefinement({
          ...currentRefinement,
          logoIds: currentRefinement.logoIds.filter((lId) => lId !== id),
        });
        break;
      case "formalRank":
        onChangeCurrentRefinement({
          ...currentRefinement,
          formalRank: { min: 1, max: 10 },
        });
        break;
      case "rank":
        onChangeCurrentRefinement({
          ...currentRefinement,
          rankIds: currentRefinement.rankIds.filter((rId) => rId !== id),
        });
        break;
      case "option":
        onChangeCurrentRefinement({
          ...currentRefinement,
          optionIds: currentRefinement.optionIds.filter((oId) => oId !== id),
        });
        break;
      default:
        break;
    }
  };

  return {
    appliedFilterArrayData,
    handleClickClear,
    handleClickDelete,
  };
};
