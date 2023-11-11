import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalShowResponse;
  readonly error: Error | null;
};
export type TRentalShowResponse = {
  rentalStatus: number;
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalShow = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalShowResponse>(`biz/rentals/${rentalId}`);
  return {
    data,
    error,
  };
};
