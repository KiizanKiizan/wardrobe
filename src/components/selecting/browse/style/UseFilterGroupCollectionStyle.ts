import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useFilterGroupCollectionStyle = makeStyles((theme: Theme) =>
  createStyles({
    filterPaper: {
      flexShrink: 0,
      maxWidth: 150,
    },
    idSearch: {
      marginTop: theme.spacing(1),
    },
    partSize: {
      display: "block",
    },
  })
);
