import { AxiosResponse } from "axios";
import { axiosAuthInstance, AUTH_URL } from "./auth";

export type UserInfoResponse = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username: string;
  email: string;
};

export async function getUserInfo(): Promise<AxiosResponse<UserInfoResponse>> {
  return axiosAuthInstance.get(`${AUTH_URL}/oauth2/userInfo`).then((resp) => {
    resp.data = resp.data as UserInfoResponse;
    return resp;
  });
}
