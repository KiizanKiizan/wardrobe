import { FormControl, Select, Toolbar, Typography } from "@mui/material";
import { BrowseRefinementChoiceResponse } from "../../../model/api/response/styling/browse/BrowseRefinementChoiceResponse";
import { AppliedFilterArray } from "./AppliedFilterArray";
import { BrowseDetailContainer } from "./BrowseDetailContainer";
import { FilterGroupCollection } from "./FilterGroupCollection";
import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import { useBrowseIndexProvider } from "./provider/UseBrowseIndexProvider";
import { useItemBrowseStyle } from "./style/UseItemBrowseStyle";

export interface ItemBrowseProps {
  response: BrowseRefinementChoiceResponse;
  callback: ItemBrowseCallback;
  currentSelectedItemId: number | null;
}

export const ItemBrowse = (props: ItemBrowseProps) => {
  const classes = useItemBrowseStyle();

  const handler = useItemBrowseHandler(props.response, props.callback);
  const provider = useBrowseIndexProvider(handler.currentRefinement);

  if (handler.selectedPreregisteredItemId) {
    return (
      <BrowseDetailContainer
        id={handler.selectedPreregisteredItemId}
        refinement={handler.currentRefinement}
        callback={handler.browseDetailCallback()}
        currentSelectedItemId={props.currentSelectedItemId}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" noWrap>
        アイテム一覧
      </Typography>
      <Toolbar className={classes.itemBrowseHeader}>
        <div className={classes.searchResult}>{provider.totalItemCountComponent()}</div>
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
            <Select native value={handler.selectedSortIndex()} onChange={handler.onSortChanged()}>
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
        {provider.itemCardCollectionComponent(handler.itemCardCollectionCallback())}
      </div>
      <div className={classes.paginationContainer}>
        {provider.paginationComponent(handler.paginationCallback())}
      </div>
    </>
  );
};
