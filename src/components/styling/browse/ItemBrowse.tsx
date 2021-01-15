import { FormControl, Select, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import { useBrowseStyle } from "./style/UseBrowseStyle";
import FilterGroupCollection from "./FilterGroupCollection";
import AppliedFilterArray from "./AppliedFilterArray";
import RefinementChoiceResponse from "../../../model/api/response/styling/browse/RefinementChoiceResponse";
import { useBrowseIndexProvider } from "./provider/UseBrowseIndexProvider";
import BrowseDetailContainer from "./BrowseDetailContainer";
import ItemBrowseCallback from "./callback/ItemBrowseCallback";

export interface ItemBrowseProps {
  response: RefinementChoiceResponse;
  callback: ItemBrowseCallback;
}

const ItemBrowse = (props: ItemBrowseProps) => {
  const classes = useBrowseStyle();

  const handler = useItemBrowseHandler(props.response, props.callback);
  const provider = useBrowseIndexProvider(handler.currentRefinement);

  if (handler.selectedPreregisteredItemId) {
    return (
      <BrowseDetailContainer
        id={handler.selectedPreregisteredItemId}
        callback={handler.browseDetailCallback()}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" noWrap>
        アイテム一覧
      </Typography>
      <Toolbar className={classes.itemBrowseHeader}>
        <div className={classes.searchResult}>
          {provider.totalItemCountComponent()}
        </div>
        <div className={classes.appliedFilterContainer}>
          <Typography>適用済みフィルター</Typography>
          <AppliedFilterArray
            data={handler.appliedFilterArrayData()}
            callback={handler.appliedFiltersCallback()}
          />
        </div>
        <div>
          <Typography>並べ替え</Typography>
          <FormControl className={classes.sortSelection}>
            <Select
              native
              value={handler.selectedSortIndex()}
              onChange={handler.onSortChanged()}
            >
              {handler.sortSelection().map((row, index) => (
                <option value={index} key={index}>
                  {row}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </Toolbar>
      <div className={classes.searchField}>
        <FilterGroupCollection
          data={handler.filterGroupCollectionData()}
          callback={handler.filterGroupCollectionCallback()}
        />
        {provider.itemCardCollectionComponent(
          handler.itemCardCollectionCallback()
        )}
      </div>
      <div className={classes.paginationContainer}>
        {provider.paginationComponent(handler.paginationCallback())}
      </div>
    </>
  );
};

export default ItemBrowse;