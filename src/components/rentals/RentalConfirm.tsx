import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { CREATING_COORDINATE } from "../../constants/rentalStatus";
import { TRentalCoordinateShowResponse } from "../../hooks/api/UseRentalCoordinateShow";
import { useRentalCoordinateUpdate } from "../../hooks/api/UseRentalCoordinateUpdate";
import { useRentalRequestShow } from "../../hooks/api/UseRentalRequestShow";
import { useRentalUpdateToPreparingShipment } from "../../hooks/api/UseRentalUpdateToPreparingShipment";
import { RentalIdContext } from "../context/RentalContextProvider";
import { ItemConfirmCard } from "../shared/ItemConfirmCard";

type TProps = {
  rentalCoordinate: TRentalCoordinateShowResponse;
  onClickBackButton: () => void;
};
export const RentalConfirm = ({
  rentalCoordinate,
  onClickBackButton,
}: TProps) => {
  const search = useLocation().search;
  const { rentalId } = useContext(RentalIdContext);
  const queryClient = useQueryClient();
  const {
    mutate: updateCoordinateChoice,
    isLoading: isUpdateCoordinateLoading,
  } = useRentalCoordinateUpdate({
    rentalId,
  });
  const { mutate: updateStatus, isLoading: isUpdateShipmentStatusLoading } =
    useRentalUpdateToPreparingShipment({ rentalId });
  const { data: rentalRequest, error: rentalRequestError } =
    useRentalRequestShow({ rentalId });
  const [selectedCoordinateChoiceId, setSelectedCoordinateChoiceId] =
    useState<number>(rentalCoordinate.coordinateChoiceId);

  const statusQuery = new URLSearchParams(search);
  const isRentalStatusCreatingCoordinate =
    parseInt(statusQuery.get("status") ?? "") === CREATING_COORDINATE;

  const isNotYetAllPicked = rentalCoordinate.items.some(
    (item) => item.locationId !== null,
  );

  if (rentalRequestError)
    return <Typography>{rentalRequestError.message}</Typography>;

  if (!rentalRequest) return <CircularProgress />;

  return (
    <>
      <div
        style={{
          margin: "80px 0 220px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={onClickBackButton}
            size="large"
            style={{
              width: "100px",
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" noWrap>
            選択コーデ確認画面
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{
              width: "150px",
            }}
            disabled={
              isUpdateShipmentStatusLoading ||
              rentalCoordinate.items.length !== 3 ||
              isNotYetAllPicked ||
              !isRentalStatusCreatingCoordinate
            }
            onClick={() => {
              if (
                isRentalStatusCreatingCoordinate &&
                window.confirm("出荷準備に移動しますか？")
              ) {
                updateStatus(undefined, {
                  onSuccess: () => {
                    alert("登録しました");
                  },
                  onError: (error) => {
                    alert(error.message);
                  },
                });
              }
            }}
          >
            出荷準備に移動
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <FormControl style={{ width: "500px" }}>
            <InputLabel id="stylist-select-label">コーデパターン</InputLabel>
            <Select
              labelId="stylist-select-label"
              label="コーデパターン"
              onChange={(event: SelectChangeEvent<string | number>) =>
                setSelectedCoordinateChoiceId(event.target.value as number)
              }
              defaultValue={rentalCoordinate.coordinateChoiceId}
            >
              {rentalRequest.coordinateChoices.map((choice) => {
                return (
                  <MenuItem key={choice.id} value={choice.id}>
                    {`第${choice.preferenceChoice}希望: ${choice.name}`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            style={{ width: 100, marginLeft: 20 }}
            disabled={
              isUpdateCoordinateLoading ||
              rentalCoordinate.coordinateChoiceId === selectedCoordinateChoiceId
            }
            onClick={() => {
              updateCoordinateChoice(
                { coordinateChoiceId: selectedCoordinateChoiceId },
                {
                  onSuccess: () => {
                    alert("更新しました");
                    queryClient.invalidateQueries(
                      `biz/rentals/${rentalId}/rental_coordinate`,
                    );
                  },
                  onError: (error) => {
                    alert(error.message);
                  },
                },
              );
            }}
          >
            変更する
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          {rentalCoordinate.items.map((item, index) => (
            <ItemConfirmCard item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
