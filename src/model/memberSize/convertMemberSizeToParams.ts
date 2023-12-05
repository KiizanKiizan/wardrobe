import { MemberSizeUpdateParams } from "../api/request/styling/member_size/MemberSizeUpdateParams";
import { UpdateSizes } from "../api/request/styling/member_size/UpdateSizes";
import {
  TMemberBasicSizesEditableKey,
  TMemberPartSizeEditableKey,
  TMemberPartSizesKey,
  TMemberSizes,
} from "./MemberSizeTypes";

export const convertMemberSizeToParams = (
  fetchedSizes: TMemberSizes,
  editingSizes: TMemberSizes,
  chartId: number,
): MemberSizeUpdateParams => {
  const valueIfChangedBasic = (sizeName: TMemberBasicSizesEditableKey) => {
    const editingValue = editingSizes.basicSizes[sizeName];
    return fetchedSizes.basicSizes[sizeName] !== editingValue ? editingValue : undefined;
  };

  const valueIfChangedPart = (
    partName: TMemberPartSizesKey,
    sizeName: TMemberPartSizeEditableKey,
  ) => {
    const editingValue = editingSizes.partSizes[partName][sizeName];
    return fetchedSizes.partSizes[partName][sizeName] !== editingValue ? editingValue : undefined;
  };

  const updateSizes: UpdateSizes = {
    height: valueIfChangedBasic("height"),
    weight: valueIfChangedBasic("weight"),
    sizeTopsAdmin: valueIfChangedBasic("topsAdmin"),
    sizeJacketAdmin: valueIfChangedBasic("jacketAdmin"),
    sizeDropSizeAdmin: valueIfChangedBasic("dropSizeAdmin"),
    shoulder: valueIfChangedPart("shoulder", "size"),
    shoulderJacket: valueIfChangedPart("shoulder", "jacketSize"),
    bust: valueIfChangedPart("bust", "size"),
    bustJacket: valueIfChangedPart("bust", "jacketSize"),
    lengthTop: valueIfChangedPart("lengthTop", "size"),
    lengthTopJacket: valueIfChangedPart("lengthTop", "jacketSize"),
    lengthArm: valueIfChangedPart("lengthArm", "size"),
    lengthArmJacket: valueIfChangedPart("lengthArm", "jacketSize"),
    waist: valueIfChangedPart("waist", "size"),
    hip: valueIfChangedPart("hip", "size"),
    roundLeg: valueIfChangedPart("roundLeg", "size"),
    lengthLeg: valueIfChangedPart("lengthLeg", "size"),
    roundCalf: valueIfChangedPart("roundCalf", "size"),
  };

  (Object.keys(updateSizes) as (keyof UpdateSizes)[]).forEach(
    (key) => updateSizes[key] === undefined && delete updateSizes[key],
  );

  return {
    chartId,
    sizes: updateSizes,
  };
};
