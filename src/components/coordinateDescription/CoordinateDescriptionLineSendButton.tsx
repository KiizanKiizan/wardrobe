import { Alert, Box, Button, CircularProgress, Dialog, Snackbar, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useCoordinateHearingStatusShow } from "../../hooks/api/UseCoordinateHearingStatusShow";
import { useCoordinateHearingStatusUpdate } from "../../hooks/api/UseCoordinateHearingStatusUpdate";
import { useLineMessagesCreate } from "../../hooks/api/UseLineMessagesCreate";
import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { HEARING_STATUS } from "../../model/shared/HearingStatus";
import { createCoordinateFlexMessage } from "../chart/createCoordinateFlexMessage";

type TProps = {
  descriptionText: string;
  coordinateItems: TCoordinateItem[];
  disabled: boolean;
  simplifiedHearing?: SimplifiedHearingsShowResponse;
  coordinateId: number;
};

export const CoordinateDescriptionLineSendButton = ({
  descriptionText,
  coordinateItems,
  disabled,
  simplifiedHearing,
  coordinateId,
}: TProps) => {
  const queryClient = useQueryClient();
  const messages = createCoordinateFlexMessage({
    descriptionText,
    coordinateItems,
    simplifiedHearing,
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useLineMessagesCreate();
  const { mutate: mutateStatus } = useCoordinateHearingStatusUpdate(coordinateId);
  const { data, error } = useCoordinateHearingStatusShow({ coordinateId });

  const onUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  const currentStatus: string | undefined =
    "currentStatus" in data ? data.currentStatus : undefined;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        disabled={
          disabled ||
          isLoading ||
          simplifiedHearing === undefined ||
          (currentStatus ? currentStatus !== "確認中" : false)
        }
        variant="contained"
        onClick={() => {
          if (window.confirm("コーデ提案を送信しますか？")) {
            window.addEventListener("beforeunload", onUnload);
            setIsPostLoading(true);
            mutate(
              { messages },
              {
                onSuccess: () => {
                  setSeverity("success");
                  setSnackBarText("メッセージを送信しました");
                  currentStatus === "確認中" &&
                    mutateStatus(
                      { status: HEARING_STATUS.SUGGESTING },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries(
                            `styling/coordinates/${coordinateId}/coordinate_hearing_status`,
                          );
                        },
                        onError(error: AxiosError) {
                          alert(
                            `ステータス更新に失敗しました。error message:  ${(
                              error.response?.data as { message: string }
                            )?.message}`,
                          );
                        },
                      },
                    );
                },
                onError: () => {
                  setSeverity("error");
                  setSnackBarText("メッセージの送信に失敗しました");
                },
                onSettled: () => {
                  setIsSnackBarOpen(true);
                  setIsPostLoading(false);
                  window.removeEventListener("beforeunload", onUnload);
                },
              },
            );
          }
        }}
      >
        LINEで送信する
      </Button>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
      <Dialog open={isPostLoading} disableEscapeKeyDown>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
        <Alert severity="warning">送信中です。画面を閉じないでください</Alert>
      </Dialog>
    </Box>
  );
};
