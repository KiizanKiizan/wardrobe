import { Delete, Edit } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Snackbar,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { useNgsDestroy } from "../../hooks/api/UseNgsDestroy";
import { NgIndexResponse } from "../../model/api/response/styling/ng/NgIndexResponse";
import { ChartDialogContainer } from "../chart/ChartDialogContainer";
import { PopupImage } from "../shared/PopupImage";
import { NgMemoDialogContainer } from "./NgMemoDialogContainer";

type Props = {
  readonly response: NgIndexResponse[];
};
export const NgMemoCollection = (props: Props) => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );
  const [isOpenNgMemoDialog, setIsOpenNgMemoDialog] = useState<boolean>(false);
  const [selectedChartId, setSelectedChartId] = useState<number | undefined>(
    undefined
  );
  const [editingNgId, setEditingNgId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate } = useNgsDestroy();

  const handleSubmit = (ngId: number) => {
    mutate(ngId, {
      onSuccess: () => {
        queryClient.invalidateQueries(`member/ngs`);
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモの削除に成功しました！");
      },
      onError: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモの削除に失敗しました");
      },
    });
  };

  return (
    <>
      <ListSubheader>
        NGメモ
        <IconButton
          color="secondary"
          size="large"
          onClick={() => {
            setIsOpenNgMemoDialog(true);
            setEditingNgId(undefined);
          }}
        >
          <AddCircle />
        </IconButton>
      </ListSubheader>
      <ListItem>
        <ListItemText>
          <NgMemoDialogContainer
            isOpen={isOpenNgMemoDialog}
            onClose={() => setIsOpenNgMemoDialog(false)}
            editingNgId={editingNgId}
          />
          {selectedChartId && (
            <ChartDialogContainer
              isOpen={selectedChartId !== undefined}
              onClose={() => setSelectedChartId(undefined)}
              chartId={selectedChartId}
            />
          )}
          <List dense>
            {props.response.map((ng_category, index) => (
              <Fragment key={index}>
                <ListSubheader disableSticky={true}>
                  {ng_category.categoryName}
                </ListSubheader>
                {ng_category.ngs.map((ng, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar variant="rounded">
                        {ng.itemImagePath == null ? (
                          <></>
                        ) : (
                          <PopupImage
                            data={{
                              originalImageUrl: ng.itemImagePath.thumb,
                              popupImageUrl: ng.itemImagePath.large,
                            }}
                          ></PopupImage>
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={ng.contentText}
                      secondary={`登録日：${new Date(
                        ng.createdAt
                      ).toLocaleDateString()} 更新日：${new Date(
                        ng.updatedAt
                      ).toLocaleDateString()}`}
                    ></ListItemText>
                    {ng.chartId && (
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => setSelectedChartId(ng.chartId)}
                        style={{ width: 60, fontSize: 10 }}
                      >
                        カルテ
                      </Button>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() => {
                        if (window.confirm("本当にNGメモを削除しますか？")) {
                          handleSubmit(ng.id);
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setIsOpenNgMemoDialog(true);
                        setEditingNgId(ng.id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </ListItem>
                ))}
              </Fragment>
            ))}
          </List>
        </ListItemText>
      </ListItem>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </>
  );
};
