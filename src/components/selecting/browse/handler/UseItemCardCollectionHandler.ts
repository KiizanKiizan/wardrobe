import { ItemCardResponse } from "../../../../model/api/response/styling/browse/ItemCardResponse";
import { ItemCardData } from "../../../../model/selecting/browse/props_data/ItemCardData";
import { ItemCardCallback } from "../callback/ItemCardCallback";
import { ItemCardCollectionCallback } from "../callback/ItemCardCollectionCallback";

export interface ItemCardCollectionHandler {
  itemCardArrayData: () => ItemCardData[];
  itemCardCallback: (index: number) => ItemCardCallback;
}

export const useItemCardCollectionHandler = (
  itemCards: ItemCardResponse[],
  callback: ItemCardCollectionCallback
): ItemCardCollectionHandler => {
  const itemCardArrayData = (): ItemCardData[] => {
    return itemCards.map((item) => {
      return {
        mainColorImagePath: item.mainColorImagePath,
        subColorImagePath: item.subColorImagePath,
        seriesName: item.seriesName ?? "",
        seriesFeature: item.seriesFeature ?? "",
        categoryName: item.categoryName,
        brandName: item.brandName,
        imagePath: item.imagePath,
        isMarriage: item.isMarriage,
        formalRank: item.formalRank,
      };
    });
  };

  const itemCardCallback = (index: number): ItemCardCallback => {
    return {
      onClick: () => {
        callback.onSelect(itemCards[index].id);
      },
    };
  };

  return { itemCardArrayData, itemCardCallback };
};
