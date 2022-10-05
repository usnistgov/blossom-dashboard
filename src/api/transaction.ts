import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "./auth";

export type TransactionRequest = {
  functionType: "query" | "invoke";
  name: string;
  args: string[];
  transient?: Record<string, unknown>;
};

// TODO
export type TransactionResponse = Record<string, string>;

export async function postTransaction(
  request: TransactionRequest
): Promise<AxiosResponse<TransactionResponse>> {
  return axiosAuthInstance.post("/transaction", request).then((resp) => {
    resp.data = resp.data as TransactionResponse;
    return resp;
  });
}
