import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "./auth";

export type TransactionRequest = {
  functionType: "query" | "invoke";
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
