import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Alert } from "@mui/material";
import React, { Fragment, useState } from "react";
import { ConfirmResponse } from "../../model/api/response/styling/browse/ConfirmResponse";
import { ValidationErrorType } from "../../model/selecting/browse/ValidationErrorType";
import { usePostRegisterItemsCaller } from "../../model/selecting/arrange/api_caller/UsePostRegisterItemsCaller";
import { SelectionConfirmData } from "../../model/selecting/props_data/SelectionConfirmData";
import { SelectionConfirmCallback } from "./callback/SelectionConfirmCallback";
import { SelectedItemArray } from "./SelectedItemArray";
import { useSelectionConfirmStyle } from "./style/UseSelectionConfirmStyle";

export interface SelectionConfirmProps {
  data: SelectionConfirmData;
  response: ConfirmResponse;
  callback: SelectionConfirmCallback;
}

export const SelectionConfirm = (props: SelectionConfirmProps) => {
  const classes = useSelectionConfirmStyle();
  const [stylist, setStylist] = useState<number | null>(
    props.response.stylistInfo.selectedId
  );
  const apiCaller = usePostRegisterItemsCaller(
    stylist ?? 0,
    props.data.items.map((item) => item.itemId),
    props.callback.onConfirmSelection
  );

  return (
    <>
      <IconButton
        onClick={() => props.callback.onCancelSelection()}
        size="large"
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" noWrap>
        選択コーデ確認画面
      </Typography>
      <SelectedItemArray data={props.data.items}></SelectedItemArray>
      <Paper className={classes.confirmInfoContainer}>
        <Typography variant="h6" className={classes.confirmInfoTitle}>
          確認要項
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="stylist-select-label">コーデ作成者</InputLabel>
          <Select
            labelId="stylist-select-label"
            label="コーデ作成者"
            value={stylist ?? ""}
            onChange={(event: SelectChangeEvent<string | number>) => {
              setStylist(event.target.value as number);
            }}
          >
            {props.response.stylistInfo.selectChoice.map((stylist) => (
              <MenuItem key={stylist.id} value={stylist.id}>
                {stylist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {props.response.validateErrors.length > 0 ? (
          <Paper>
            <List
              dense
              aria-labelledby="validate-error-list-subheader"
              subheader={
                <ListSubheader id="validated-erro-list-subheader">
                  コーデ登録バリデーション
                </ListSubheader>
              }
            >
              {props.response.validateErrors.map((error, index) => {
                switch (error.errorType) {
                  case ValidationErrorType.Rejected:
                    return (
                      <Alert key={index} severity="error">
                        {error.message}
                      </Alert>
                    );
                  case ValidationErrorType.Unliked:
                    return (
                      <Alert key={index} severity="warning">
                        {error.message}
                      </Alert>
                    );
                  default:
                    return <Fragment key={index}></Fragment>;
                }
              })}
            </List>
          </Paper>
        ) : (
          <></>
        )}
        {props.response.misplacedItems.length > 0 ? (
          <Paper>
            <List
              dense
              aria-labelledby="misplaced-item-list-subheader"
              subheader={
                <ListSubheader id="misplaced-item-list-subheader">
                  下記の忘れ物を確認してください
                </ListSubheader>
              }
            >
              {props.response.misplacedItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText>{item}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <></>
        )}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className={classes.changeButton}
        disabled={
          props.response.validateErrors.filter(
            (error) => error.errorType === ValidationErrorType.Rejected
          ).length > 0 || stylist === null
        }
        onClick={() => apiCaller.prepare()}
      >
        確定
      </Button>
      <Dialog open={apiCaller.isRunning()} disableEscapeKeyDown>
        <CircularProgress />
      </Dialog>
      <Dialog
        open={apiCaller.errorResponse !== null}
        onClose={apiCaller.clearErrorResponse}
      >
        <DialogTitle>エラー</DialogTitle>
        <DialogContent>
          <Typography>{apiCaller.errorResponse?.message ?? ""}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};