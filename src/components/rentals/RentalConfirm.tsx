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
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { CREATING_COORDINATE_O_RENTAL_STATUS } from "../../constants/oRentalStatus";
import { TRentalCoordinateShowResponse } from "../../hooks/api/UseRentalCoordinateShow";
import { useRentalCoordinateUpdate } from "../../hooks/api/UseRentalCoordinateUpdate";
import { useRentalRequestShow } from "../../hooks/api/UseRentalRequestShow";

import { useRentalShow } from "../../hooks/api/UseRentalShow";
import { useRentalUpdateToPreparingShipment } from "../../hooks/api/UseRentalUpdateToPreparingShipment";
import { RentalIdContext } from "../context/RentalContextProvider";
import { ItemConfirmCard } from "../shared/ItemConfirmCard";

type TProps = {
  rentalCoordinate: TRentalCoordinateShowResponse;
  onClickBackButton: () => void;
};
export const RentalConfirm = ({ rentalCoordinate, onClickBackButton }: TProps) => {
  const { rentalId } = useContext(RentalIdContext);
  const queryClient = useQueryClient();
  const { mutate: updateCoordinateChoice, isLoading: isUpdateCoordinateLoading } =
    useRentalCoordinateUpdate({
      rentalId,
    });
  const { data: rentalStatusData, error: rentalStatusError } = useRentalShow({
    rentalId,
  });
  const { mutate: updateStatus, isLoading: isUpdateShipmentStatusLoading } =
    useRentalUpdateToPreparingShipment({ rentalId });
  const { data: rentalRequest, error: rentalRequestError } = useRentalRequestShow({ rentalId });
  const [selectedCoordinateChoiceId, setSelectedCoordinateChoiceId] = useState<number>(
    rentalCoordinate.coordinateChoiceId,
  );

  if (rentalRequestError) return <Typography>{rentalRequestError.message}</Typography>;
  if (rentalStatusError) return <Typography>{rentalStatusError.message}</Typography>;

  if (!rentalRequest || !rentalStatusData) return <CircularProgress />;

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
              rentalCoordinate.items.some((item) => item.locationId !== null) ||
              rentalStatusData.rentalStatus !== CREATING_COORDINATE_O_RENTAL_STATUS
            }
            onClick={() => {
              if (window.confirm("出荷準備に移動しますか？")) {
                updateStatus(undefined, {
                  onSuccess: () => {
                    alert("登録しました");
                  },
                  onError(error: AxiosError) {
                    alert(
                      `出荷準備の登録に失敗しました。 ${(
                        error.response?.data as { message: string }
                      )?.message}`,
                    );
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
                    queryClient.invalidateQueries(`biz/rentals/${rentalId}/rental_coordinate`);
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onError: (error: any) => {
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
          {rentalCoordinate.items.map((item) => (
            <ItemConfirmCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};
