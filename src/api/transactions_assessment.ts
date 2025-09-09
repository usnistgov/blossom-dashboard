import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "./auth";
import { pinErrorMsg, pinLocationMsg } from "util/debugExtras";

export type AssessmentTransactionRequest = {
  functionType?: "query" | "invoke" // The original 2(Two) operations for Chaincode
                | "assess" // Sub-Type for assessment information
                | "manage" // Sub-Type for user-roles management
                | "review" // Sub-Type for AMB-Transactions Review
                ;
  function?: string;
  args?: string[];
  transient?: Record<string, unknown>;
  type: string;
  key2?: string;
  key3?: string;
};


export type AssessmentTransactionResponse = Record<string, string>;


export async function postAssessmentTransaction(
  request: AssessmentTransactionRequest
): Promise<AxiosResponse<AssessmentTransactionResponse>> {
  // TODO: Should RECONFIGURE default mapping of the Lambda request URLs to allow for easier debugging
  // See if setting the expected structure members will resolve 401
  request.functionType = "assess";
  request.function = "aaEC2_GetUsers";
  request.args = [];

  const callURL = `${import.meta.env.BASE_URL}assessment`;
  console.log(`con-log: Will call URL: ${callURL}`);
  pinErrorMsg(`pin-err-MSG: Reached the place to set URL: ${callURL}`);
  console.log(`con-log: Will call ${callURL}\nwith request:\n${JSON.stringify(request, null, 2)}`);
  pinLocationMsg(`pin-location-MSG: ${callURL}`);
  


  return axiosAuthInstance.post<AssessmentTransactionResponse>(
    callURL, 
    request);
}