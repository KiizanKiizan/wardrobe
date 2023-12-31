import { usePatchRequest } from "./UsePatchRequest";

type TArgs = {
  readonly rentalId: number;
};

export const useRentalUpdateToPreparingShipment = ({ rentalId }: TArgs) => {
  const { mutate, isLoading } = usePatchRequest(
    `biz/rentals/${rentalId}/preparing_shipment`,
  );
  return {
    mutate,
    isLoading,
  };
};
