import { TItem } from "../../model/selecting/TItem";
import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalCoordinateShowResponse;
  readonly error: Error | null;
};
export type TRentalCoordinateShowResponse = {
  id: number;
  coordinateChoiceId: number;
  items: TItem[];
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalCoordinateShow = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalCoordinateShowResponse>(
    `biz/rentals/${rentalId}/rental_coordinate`,
  );
  return {
    data,
    error,
  };
};
