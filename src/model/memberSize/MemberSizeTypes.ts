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
  [key in TMemberBasicSizesKey]: number;
};

export type TMemberPartSizesKey =
  | "shoulder"
  | "bust"
  | "lengthTop"
  | "sleeveLength"
  | "waist"
  | "hip"
  | "roundLeg"
  | "outseam"
  | "hemWidth";

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
