import { CoordinateShowResponse } from "../../model/api/response/styling/coordinate/CoordinateShowResponse";
import { useGetRequest } from "./UseGetRequest";

export const useCoordinatesShow = (coordinateId: number) => {
  const { data, error } = useGetRequest<CoordinateShowResponse>(
    `coordinates/${coordinateId}`
  );

  return {
    data,
    error,
  };
};
