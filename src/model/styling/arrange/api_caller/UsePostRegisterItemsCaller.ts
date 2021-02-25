import { CallStatus } from "../../../api/shared/CallStatus";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import { ChartId } from "../../../ChartId";
import { usePostClient } from "../../../api/client/UsePostClient";
import { useRegisterItemsRequest } from "../../../api/request/styling/arrange/UsePostRegisterItemsRequest";

export interface PostRegisterItemsCaller {
  isRunning: () => boolean;
  errorResponse: ErrorResponse | null;
  prepare: () => void;
  clearErrorResponse: () => void;
}

export const usePostRegisterItemsCaller = (
  adminId: number,
  itemIds: number[],
  onSuccess: () => void
): PostRegisterItemsCaller => {
  const [callStatus, setCallStatus] = useState(CallStatus.Idle);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  const request = useRegisterItemsRequest(ChartId(), adminId, itemIds);
  const client = usePostClient(request);

  useEffect(() => {
    if (callStatus === CallStatus.Preparing) {
      const fetch = () => {
        client
          .post()
          .then(() => {
            setErrorResponse(null);
            setCallStatus(CallStatus.Idle);
            onSuccess();
          })
          .catch((error: ErrorResponse) => {
            setErrorResponse(error);
            setCallStatus(CallStatus.Idle);
          });
      };
      setCallStatus(CallStatus.Running);
      fetch();
    }
  }, [callStatus, client, onSuccess]);

  const isRunning = (): boolean => {
    return callStatus === CallStatus.Running;
  };

  const prepare = () => {
    setCallStatus(CallStatus.Preparing);
  };

  const clearErrorResponse = () => {
    setErrorResponse(null);
  };

  return { isRunning, errorResponse, prepare, clearErrorResponse };
};
