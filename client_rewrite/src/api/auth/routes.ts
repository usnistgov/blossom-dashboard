import axios, { AxiosResponse } from "axios";

export const AUTH_URL = "https://blossomtest.auth.us-east-1.amazoncognito.com";
export const CLIENT_ID = "29hofkqg01irnfp2n8sp298nd7";
export const REDIRECT_URI = `${window.location.origin}/`;

export type OAuthResponse = {
  id_token?: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export function oauthAuthorize(
  code: string
): Promise<AxiosResponse<OAuthResponse>> {
  const data = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
  });

  return axios.post<OAuthResponse>(`${AUTH_URL}/oauth2/token`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function oauthRefresh(
  refresh_token: string
): Promise<AxiosResponse<OAuthResponse>> {
  const data = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
    client_id: CLIENT_ID,
  });

  return axios.post<OAuthResponse>(`${AUTH_URL}/oauth2/token`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function buildLoginHref(): string {
  return `${AUTH_URL}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=email+openid&redirect_uri=${REDIRECT_URI}`;
}
