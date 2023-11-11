import { usePatchRequest } from "./UsePatchRequest";

type TParams = {
  status: number;
};

export const useCoordinateHearingStatusUpdate = (coordinateId: number) => {
  const { mutate, isLoading } = usePatchRequest<TParams>(
    `styling/coordinates/${coordinateId}/coordinate_hearing_status`,
  );

  return { mutate, isLoading };
};
