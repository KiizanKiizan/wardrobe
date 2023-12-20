import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalRequestShowResponse;
  readonly error: Error | null;
};
export type TRentalRequestShowResponse = {
  id: number;
  coordinateChoices: TCoordinateChoice[];
  height: number;
  weight: number;
  bmi: number;
  topsSize: string;
  bottomsSize: string;
  shoulder: string;
  bust: string;
  hip: string;
  waist: number | null;
  freeText: string | null;
  referenceJacketSize: string;
  referenceJacketDropSize: string;
  referenceShoulderSize: number;
  referenceBustSize: number;
  referenceWaistSize: number;
  referenceSleeveLengthSize: number;
  referenceHipSize: number;
  referenceRoundLegSize: number;
  referenceHemWidthSize: number;
  referenceLengthBodySize: number;
  referenceOutSeamSize: number;
};

type TCoordinateChoice = {
  id: number;
  name: string;
  preferenceChoice: number;
  imageFilePath: string;
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalRequestShow = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalRequestShowResponse>(
    `biz/rentals/${rentalId}/rental_request`,
  );
  return {
    data,
    error,
  };
};
