import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useSelectionProgressStyle = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      width: "100%",
      padding: theme.spacing(1, 0),
    },
    stepperImage: {
      height: 60,
      width: 40,
    },
    stepButton: {
      margin: 0,
      padding: 0,
    },
  })
);
