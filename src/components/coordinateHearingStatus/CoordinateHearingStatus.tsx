import { Box, Button, Menu, MenuItem } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useCoordinateHearingStatusUpdate } from "../../hooks/api/UseCoordinateHearingStatusUpdate";
import { THearingStatus } from "../../model/api/response/styling/coordinateHearingStatus/NextStatuses";

type TProps = {
  currentStatus: string;
  nextStatuses: THearingStatus[];
  prevStatus: THearingStatus | null;
  coordinateId: number;
};

export const CoordinateHearingStatus = ({
  currentStatus,
  nextStatuses,
  prevStatus,
  coordinateId,
}: TProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useCoordinateHearingStatusUpdate(coordinateId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickChangeStatus = (coordinateId: number, nextStatusId: number) => {
    if (!["提案済み", "修正待ち"].includes(currentStatus)) {
      if (!window.confirm("手動で変更しますか？")) return;
    }

    handleClose();
    mutate(
      { status: nextStatusId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            `styling/coordinates/${coordinateId}/coordinate_hearing_status`,
          );
        },
        onError(error: AxiosError) {
          alert(
            `ステータス更新に失敗しました。\n別タブで既にステータス更新処理が行われた可能性があります。\n再度ページをリロードしてください。\nerror message:  ${(
              error.response?.data as { message: string }
            )?.message}`,
          );
        },
      },
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const displayBackgroundColor = (currentStatus: string) => {
    switch (currentStatus) {
      case "確認中":
        return "secondary";
      case "作成待ち":
      case "修正待ち":
        return "primary";
      case "提案済み":
        return "info";
      default:
        return "inherit";
    }
  };
  return (
    <Box pt={1.5}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color={displayBackgroundColor(currentStatus)}
        sx={{ borderRadius: 8 }}
      >
        {currentStatus}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {nextStatuses.map((status) => (
          <MenuItem
            key={status.id}
            onClick={() => handleClickChangeStatus(coordinateId, status.id)}
          >
            {status.name}
          </MenuItem>
        ))}
        {prevStatus !== null && (
          <MenuItem
            key={prevStatus.id}
            onClick={() => handleClickChangeStatus(coordinateId, prevStatus.id)}
          >
            <span style={{ color: "red" }}>「{prevStatus.name}」に戻す</span>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
