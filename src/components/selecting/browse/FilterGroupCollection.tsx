import { ExpandMore, Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { FilterGroupCollectionData } from "../../../model/selecting/browse/props_data/FilterGroupCollectionData";
import { FilterCategoryGroup } from "./FilterCategoryGroup";
import { FilterCheckboxArray } from "./FilterCheckboxArray";
import { FilterFormalRank } from "./FilterFormalRank";
import { FilterMediaArray } from "./FilterMediaArray";
import { FilterPartSize } from "./FilterPartSize";
import { FilterSizeArray } from "./FilterSizeArray";
import { FilterGroupCollectionCallback } from "./callback/FilterGroupCollectionCallback";
import { useFilterGroupCollectionStyle } from "./style/UseFilterGroupCollectionStyle";

interface FilterGroupCollectionProps {
  data: FilterGroupCollectionData;
  callback: FilterGroupCollectionCallback;
}

export const FilterGroupCollection = (props: FilterGroupCollectionProps) => {
  const classes = useFilterGroupCollectionStyle();

  return (
    <div className={classes.filterPaper}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter1a-content"
          id="filter1a-header"
        >
          <Typography variant="body2">カテゴリー</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense component="nav">
            <FilterCategoryGroup
              data={props.data.categoryData}
              callback={props.callback.categoryCallback}
            />
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter2a-content"
          id="filter2a-header"
        >
          <Typography variant="body2">サイズ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterSizeArray data={props.data.sizeData} callback={props.callback.sizeCallback} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">部位数値</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.partSize}>
          <FilterPartSize
            data={props.data.partSizeData}
            callback={props.callback.partSizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter3a-content"
          id="filter3a-header"
        >
          <Typography variant="body2">カラー</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="color-checkbox-list-label-"
            data={props.data.colorData}
            callback={props.callback.colorCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter4a-content"
          id="filter4a-header"
        >
          <Typography variant="body2">柄</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="pattern-checkbox-list-label-"
            data={props.data.patternData}
            callback={props.callback.patternCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter5a-content"
          id="filter5a-header"
        >
          <Typography variant="body2">ロゴ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="logo-checkbox-list-label-"
            data={props.data.logoData}
            callback={props.callback.logoCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter6a-content"
          id="filter6a-header"
        >
          <Typography variant="body2">ドロップサイズ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="drop-size-checkbox-list-label-"
            data={props.data.dropSizeData}
            callback={props.callback.dropSizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter6a-content"
          id="filter6a-header"
        >
          <Typography variant="body2">キレイ度</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.partSize}>
          <FilterFormalRank
            data={props.data.formalRankData}
            onChange={props.callback.formalRankCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">NG</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={props.data.ngData}
            callback={props.callback.ngCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">ランク</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={props.data.rankData}
            callback={props.callback.rankCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">季節ルール</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={props.data.monthsData}
            callback={props.callback.monthsCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">その他</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={props.data.optionData}
            callback={props.callback.optionCallback}
          />
        </AccordionDetails>
      </Accordion>
      <TextField
        className={classes.idSearch}
        label="アイテムID"
        InputProps={{ startAdornment: <Search /> }}
        color="secondary"
        type="number"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onKeyPress={(event: any) => {
          if (event.key === "Enter") {
            props.callback.onItemIdChanged(event.target.value as number);
          }
        }}
      ></TextField>
    </div>
  );
};
