import { Dialog } from "@mui/material";
import { useState } from "react";
import { PopupImageData } from "../../model/shared/props_data/PopupImageData";

interface PopupImageProps {
  data: PopupImageData;
}

export const PopupImage = (props: PopupImageProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <img
        src={props.data.originalImageUrl}
        width="100%"
        height="auto"
        alt=""
        onClick={() => setIsPopupOpen(true)}
        className={props.data.imageStyle}
      />
      <Dialog
        maxWidth="sm"
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <img src={props.data.popupImageUrl} width="100%" height="auto" alt="" />
      </Dialog>
    </>
  );
};
