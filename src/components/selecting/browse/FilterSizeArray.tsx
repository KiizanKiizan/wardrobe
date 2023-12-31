import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { FilterSizeData } from "../../../model/selecting/browse/props_data/FilterSizeData";
import { FilterSizeArrayCallback } from "./callback/FilterSizeArrayCallback";

interface FilterSizeArrayProps {
  data: FilterSizeData[];
  callback: FilterSizeArrayCallback;
}

export const FilterSizeArray = (props: FilterSizeArrayProps) => {
  return (
    <ButtonGroup
      orientation="vertical"
      color="secondary"
      disableElevation
      aria-label="button group"
    >
      {props.data.map((row, index) => (
        <Button
          variant={row.isSelected ? "contained" : "outlined"}
          onClick={() => props.callback.onClick(index)}
          key={index}
        >
          {row.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};
