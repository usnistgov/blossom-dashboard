import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "./auth";

export type TransactionRequest = {
  functionType: "query" | "invoke" // The original 2(Two) operations for Chaincode
                | "assess" // Sub-Type for assessment information
                | "manage" // Sub-Type for user-roles management
                | "review" // Sub-Type for AMB-Transactions Review
                ;
  function: string;
  args: string[];
  transient?: Record<string, unknown>;
};

// TODO
export type TransactionResponse = Record<string, string>;

export async function postTransaction(
  request: TransactionRequest
): Promise<AxiosResponse<TransactionResponse>> {
  console.log(`${import.meta.env.BASE_URL}/transaction`);
  return axiosAuthInstance.post<TransactionResponse>(`${import.meta.env.BASE_URL}transaction`, request);
}
