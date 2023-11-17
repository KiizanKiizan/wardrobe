import { FormalRankRefinement } from "../../../../selecting/browse/FormalRankRefinement";
import { GetIndexFilterPartSizeParams } from "./GetIndexFilterPartSizeParams";

export interface GetIndexFilterParams {
  itemId?: number;
  largeCategory?: number;
  mediumCategory?: number;
  smallCategory: number[];
  size: number[];
  partSize: GetIndexFilterPartSizeParams[];
  color: number[];
  pattern: number[];
  logo: number[];
  dropSize: number[];
  formalRank: FormalRankRefinement;
  ng?: number[];
  option: number[];
  rank: string[];
}
