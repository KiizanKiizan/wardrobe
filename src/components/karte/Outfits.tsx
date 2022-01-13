import { Box, Divider, Typography } from "@mui/material";
import { KarteOutfitResponse } from "../../model/api/response/styling/karte/KarteOutfitResponse";

type Props = {
  readonly data: KarteOutfitResponse[];
};
export const Outfits = (props: Props) => {
  return (
    <>
      {props.data.map((outfit, index) => (
        <>
          <Typography>コーデ{index + 1}</Typography>
          <Box
            sx={{
              display: "flex",
              p: 1,
              m: 1,
            }}
          >
            {outfit.items.map((item) => (
              <img
                src={item.imageFileName}
                style={{ marginRight: "1em" }}
                alt=""
              />
            ))}
            <Typography variant="body2">
              {outfit.advices.map((advice, index) => (
                <>
                  <span>
                    {index + 1}. {advice}
                  </span>
                  <br />
                </>
              ))}
            </Typography>
          </Box>
          <Divider />
        </>
      ))}
    </>
  );
};