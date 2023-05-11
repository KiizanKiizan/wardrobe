export type TMemberSizes = {
  basicSizes: TMemberBasicSizes;
  partSizes: TMemberPartSizes;
};

export type TMemberBasicSizesKey =
  | "bmi"
  | "height"
  | "weight"
  | "tops"
  | "topsAdmin"
  | "bottoms"
  | "bottomsAdmin"
  | "jacketAdmin"
  | "dropSizeAdmin"
  | "referenceJacketSize"
  | "referenceJacketDropSize";

export type TMemberBasicSizesEditableKey =
  | "height"
  | "weight"
  | "topsAdmin"
  | "jacketAdmin"
  | "dropSizeAdmin";

export type TMemberBasicSizes = {
  [key in TMemberBasicSizesKey]: key extends "tops" | "bottoms"
    ? number | null
    : number;
};

export type TMemberPartSizesKey =
  | "sholder"
  | "bust"
  | "lengthTop"
  | "lengthArm"
  | "waist"
  | "hip"
  | "roundLeg"
  | "lengthLeg"
  | "roundCalf";

export type TMemberPartSizes = {
  [key in TMemberPartSizesKey]: TMemberPartSize;
};

export type TMemberPartSize = {
  label: string;
  size: number | null;
  referenceSize: number;
  jacketSize?: number | null;
};

export type TMemberPartSizeEditableKey = "size" | "jacketSize";
