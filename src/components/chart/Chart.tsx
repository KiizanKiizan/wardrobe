import { ListItem, ListItemText, Typography } from "@mui/material";
import { CoordinateContainer } from "../coordinate/CoordinateContainer";

type TProps = {
  readonly id: number;
  readonly rentalStartedAt: string | null;
};

export const Chart = ({ id, rentalStartedAt }: TProps) => {
  return (
    <>
      <ListItem key={id}>
        <ListItemText>
          <Typography variant="h6">カルテID: {id}</Typography>
          <Typography variant="body2" style={{ color: "gray" }}>
            発送日:テスト
            {rentalStartedAt
              ? new Date(rentalStartedAt!).toLocaleDateString()
              : ""}
          </Typography>
        </ListItemText>
      </ListItem>
      <CoordinateContainer chartId={id} />
    </>
  );
};
