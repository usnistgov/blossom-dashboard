import axios, { AxiosResponse } from "axios";

// Defined via environment variables, see .env.sample
export const AUTH_URL = (import.meta.env.VITE_AUTH_URL ?? "") as string;
export const CLIENT_ID = (import.meta.env.VITE_CLIENT_ID ?? "") as string;
export const CLIENT_SECRET = (import.meta.env.VITE_CLIENT_SECRET ??
  "") as string;

export const REDIRECT_URI = `${window.location.origin}`;

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

export function buildLoginHref(): string {
  return `${AUTH_URL}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=email+openid&redirect_uri=${REDIRECT_URI}`;
}
