import { Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import KarteContainerData from "../../../model/styling/karte/props_data/KarteContainerData";
import { useStylingStyle } from "../style/UseStylingStyle";
import KarteContainerCallback from "./callback/KarteContainerCallback";
import { useKarteProvider } from "./provider/UseKarteProvider";

export interface KarteContainerProps {
  data: KarteContainerData;
  callback: KarteContainerCallback;
}

const KarteContainer = (props: KarteContainerProps) => {
  const classes = useStylingStyle();
  const karteProvider = useKarteProvider();

  return (
    <>
      <div className={classes.karteContainer}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            コーデ作成情報
          </Typography>
        </div>
        <Divider />
        {karteProvider.karteComponent()}
      </div>
      <Paper variant="outlined" className={classes.progressContainer}>
        {karteProvider.selectionProgressComponent(
          props.data.selectedIndex,
          props.data.items,
          props.callback.selectionProgressCallback
        )}
      </Paper>
    </>
  );
};

export default KarteContainer;