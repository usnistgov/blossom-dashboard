import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "./auth";
import { pinErrorMsg, pinLocationMsg } from "util/debugExtras";

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
  const liveSideBySide="https://pix35w1qac.execute-api.us-east-1.amazonaws.com/dev/kqy4o7/";
  
  console.log(`${import.meta.env.BASE_URL}/transaction`);
  return axiosAuthInstance.post<TransactionResponse>(`${import.meta.env.BASE_URL}transaction`, request);

  // import.meta.env.PROXY_URL;
  // TODO: Should redo default mapping of the Lambda request URLs to allow for easier debugging
  // if (import.meta.env.BASE_URL.startsWith("/dev/")){
  //   console.log(`@localhost, ${import.meta.env.BASE_URL}transaction`);
  //   console.log(`@localhost, but can ${liveSideBySide}transaction`);    
  //   return axiosAuthInstance.post<TransactionResponse>(`${liveSideBySide}transaction`, request);
  // }else{
  //   console.log(`${import.meta.env.BASE_URL}transaction`);  
  //   return axiosAuthInstance.post<TransactionResponse>(`${import.meta.env.BASE_URL}transaction`, request);
  // }
}
