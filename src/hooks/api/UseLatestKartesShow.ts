import { LatestKarteShowResponse } from "../../model/api/response/styling/latestKarte/LatestKarteShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type LatestKartesShow = {
  readonly data?: LatestKarteShowResponse;
  readonly error: Error | null;
};

type TLatestKartesShowArg = {
  memberId: number;
};

export const useLatestKartesShow = ({
  memberId,
}: TLatestKartesShowArg): LatestKartesShow => {
  const { data, error } = useMemberGetRequest<
    LatestKarteShowResponse,
    undefined
  >("latest_kartes", memberId);

  return {
    data,
    error,
  };
};
