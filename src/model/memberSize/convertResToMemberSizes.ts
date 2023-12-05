import { MemberSizeShowResponse } from "../api/response/styling/member_size/MemberSizeShowResponse";
import { TMemberBasicSizes, TMemberPartSizes, TMemberSizes } from "./MemberSizeTypes";

export const convertResToMemberSizes = (response: MemberSizeShowResponse): TMemberSizes => {
  const basicSizes = (): TMemberBasicSizes => {
    const {
      sizeTops: tops,
      sizeTopsAdmin: topsAdmin,
      sizeBottoms: bottoms,
      sizeBottomsAdmin: bottomsAdmin,
      sizeJacketAdmin: jacketAdmin,
      sizeDropSizeAdmin: dropSizeAdmin,
      referenceJacketDropSize,
      referenceJacketSize,
      bmi,
      height,
      weight,
    } = response;

    return {
      tops,
      topsAdmin,
      bottoms,
      bottomsAdmin,
      jacketAdmin,
      dropSizeAdmin,
      referenceJacketDropSize,
      referenceJacketSize,
      bmi,
      height,
      weight,
    };
  };

  const partSizes = (): TMemberPartSizes => {
    return {
      shoulder: {
        label: "肩幅",
        size: response.shoulder,
        jacketSize: response.shoulderJacket,
        referenceSize: response.referenceShoulderSize,
      },
      bust: {
        label: "バスト",
        size: response.bust,
        jacketSize: response.bustJacket,
        referenceSize: response.referenceBustSize,
      },
      lengthTop: {
        label: "着丈",
        size: response.lengthTop,
        jacketSize: response.lengthTopJacket,
        referenceSize: response.referenceLengthBodySize,
      },
      sleeveLength: {
        label: "裄丈",
        size: response.sleeveLength,
        jacketSize: response.lengthArmJacket,
        referenceSize: response.referenceSleeveLength,
      },
      waist: {
        label: "ウエスト",
        size: response.waist,
        referenceSize: response.referenceWaistSize,
      },
      hip: {
        label: "ヒップ",
        size: response.hip,
        referenceSize: response.referenceHipSize,
      },
      roundLeg: {
        label: "もも周り",
        size: response.roundLeg,
        referenceSize: response.referenceRoundLegSize,
      },
      outseam: {
        label: "総丈",
        size: response.outseam,
        referenceSize: response.referenceOutseamSize,
      },
      hemWidth: {
        label: "裾幅",
        size: response.hemWidth,
        referenceSize: response.referenceHemWidthSize,
      },
    };
  };

  return { basicSizes: basicSizes(), partSizes: partSizes() };
};
