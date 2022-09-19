import axios, { AxiosResponse } from "axios";

const AUTH_URL = "";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";

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
    client_secret: CLIENT_SECRET,
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
    client_secret: CLIENT_SECRET,
  });

  return axios.post<OAuthResponse>(`${AUTH_URL}/oauth2/token`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
