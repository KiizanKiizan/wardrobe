import { CircularProgress, Typography } from "@mui/material";
import { useBrowsesRefinementChoice } from "../../../hooks/api/UseBrowsesRefinementChoice";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { ChartIdContext } from "../../context/provider/ContextProvider";
import { ItemBrowse } from "./ItemBrowse";
import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";

export interface ItemBrowseContainerProps {
  callback: ItemBrowseCallback;
  categoryId: number;
  currentSelectedItemId: number | null;
}

export const ItemBrowseContainer = (props: ItemBrowseContainerProps) => {
  const { data, error, isFetching } = useBrowsesRefinementChoice({
    categoryId: props.categoryId,
    chartId: useContextDefinedState(ChartIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data || isFetching) return <CircularProgress />;

  return (
    <ItemBrowse
      response={data}
      callback={props.callback}
      currentSelectedItemId={props.currentSelectedItemId}
    />
  );
};
