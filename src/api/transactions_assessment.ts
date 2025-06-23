import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "./auth";
import { pinErrorMsg, pinLocationMsg } from "util/debugExtras";

export type AssessmentTransactionRequest = {
  functionType: "query" | "invoke" // The original 2(Two) operations for Chaincode
                | "assess" // Sub-Type for assessment information
                | "manage" // Sub-Type for user-roles management
                | "review" // Sub-Type for AMB-Transactions Review
                ;
  function: string;
  args: string[];
  transient?: Record<string, unknown>;
};

export type AssessmentTransactionResponse = Record<string, string>;

export async function postAssessmentTransaction(
  request: AssessmentTransactionRequest
): Promise<AxiosResponse<AssessmentTransactionResponse>> {
  // TODO: Should RECONFIGURE default mapping of the Lambda request URLs to allow for easier debugging
  console.log(`${import.meta.env.BASE_URL}/blossom-ec2-assessment`);
  pinLocationMsg(`${import.meta.env.BASE_URL}/blossom-ec2-assessment`);

  return axiosAuthInstance.post<AssessmentTransactionResponse>(
    `${import.meta.env.BASE_URL}blossom-ec2-assessment`, 
    request);
}