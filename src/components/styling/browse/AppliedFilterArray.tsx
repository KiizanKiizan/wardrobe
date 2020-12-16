import { Button } from "@material-ui/core";
import React from "react";
import AppliedFilterData from "../../../model/styling/browse/data/AppliedFilterData";
import AppliedFiltersCallback from "./callback/AppliedFiltersCallback";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface AppliedFilterArrayProps {
  data: AppliedFilterData[];
  callback: AppliedFiltersCallback;
}

const AppliedFilterArray = (props: AppliedFilterArrayProps) => {
  const classes = useBrowseStyle();
  return (
    <>
      {props.data.map((filter) => (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          {filter.name}
        </Button>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={props.callback.onClear}
        className={classes.button}
      >
        全ての条件を解除
      </Button>
    </>
  );
};

export default AppliedFilterArray;
