import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import { PurchasedItemIndexResponse } from "../../model/api/response/styling/purchaseItem/PurchasedItemIndexResponse";
import { PopupImage } from "../shared/PopupImage";

interface PurchasedItemCollectionProps {
  data: PurchasedItemIndexResponse[];
}

export const PurchasedItemCollection = (
  props: PurchasedItemCollectionProps
) => {
  return (
    <>
      <ListSubheader>購入済アイテム</ListSubheader>
      <ListItem>
        <ListItemText>
          <List dense>
            {props.data.map((purchasedItem, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                      <PopupImage
                        data={{
                          originalImageUrl: purchasedItem.imagePath.thumb,
                          popupImageUrl: purchasedItem.imagePath.large,
                        }}
                      ></PopupImage>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${purchasedItem.id} / 
                ${purchasedItem.brandName} / 
                ${purchasedItem.size} / 
                ${purchasedItem.categoryName} / 
                ${purchasedItem.colorName} / 
                ${purchasedItem.patternName}`}
                    secondary={`購入日：${new Date(
                      purchasedItem.purchasedDate
                    ).toLocaleDateString()}`}
                  ></ListItemText>
                </ListItem>
              );
            })}
          </List>
        </ListItemText>
      </ListItem>
    </>
  );
};
