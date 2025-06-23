import { AxiosResponse } from "axios";
import { axiosAuthInstance, AUTH_URL } from "./auth";
import { getAuthTokenCookie } from "./auth/cookies";

export type UserInfoResponse = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  username: string
  email: string;
  email_verified?: string;
  attributes?: Array<{
    name: string;
    value: string;
  }>;
};

export async function getUserInfo(): Promise<AxiosResponse<UserInfoResponse>> {
  return axiosAuthInstance.get<UserInfoResponse>(`${AUTH_URL}/oauth2/userInfo`);
}


// This is the expected return type according to AWS documentation link below (March-2025)
// (https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_GetUser.html)
export type AwsUserInfoResponse ={
  "MFAOptions": [ 
     { 
        "AttributeName": "string",
        "DeliveryMedium": "string"
     }
  ],
  "PreferredMfaSetting": "string",
  "UserAttributes": [ 
     { 
        "Name": "string",
        "Value": "string"
     }
  ],
  "UserMFASettingList": [ "string" ],
  "Username": "string"
};

export function getAwsUserInfo(): 
Promise<AxiosResponse<AwsUserInfoResponse>> {
    const body_data = {"AccessToken": getAuthTokenCookie()};

    return axiosAuthInstance.post<AwsUserInfoResponse>(
      `${AUTH_URL}`, 
      body_data, 
      {
      headers: {
        //"Host":`${AUTH_URL}`,
        "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser",
        "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    );
  }