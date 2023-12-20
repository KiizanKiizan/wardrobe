import { GetIndexFilterPartSizeParams } from "./GetIndexFilterPartSizeParams";

export interface GetDetailFilterParams {
  itemId?: number;
  size: number[];
  partSize: GetIndexFilterPartSizeParams[];
  ng: number[];
  ranks: number[];
}
