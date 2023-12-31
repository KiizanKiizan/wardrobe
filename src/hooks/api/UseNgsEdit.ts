import { NgEditResponse } from "../../model/api/response/styling/ng/NgEditResponse";
import { useGetRequest } from "./UseGetRequest";

type TNgsEdit = {
  readonly data?: NgEditResponse;
  readonly error: Error | null;
};

type TNgsEditArg = {
  ngId?: number;
};

export const useNgsEdit = ({ ngId }: TNgsEditArg): TNgsEdit => {
  const { data, error } = useGetRequest<NgEditResponse>(
    `styling/ngs/${ngId}/edit`,
    {},
    undefined,
    ngId !== undefined,
  );

  return {
    data,
    error,
  };
};
