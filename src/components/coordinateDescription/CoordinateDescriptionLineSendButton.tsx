import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
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
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useLineMessagesCreate();
  const { mutate: mutateStatus } =
    useCoordinateHearingStatusUpdate(coordinateId);
  const { data, error } = useCoordinateHearingStatusShow({ coordinateId });

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
                        onError: (error) => {
                          alert(error.message);
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
    </Box>
  );
};
