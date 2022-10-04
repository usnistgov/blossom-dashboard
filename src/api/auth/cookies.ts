function setCookie(key: string, value: string, expiration?: number) {
  let expirationStr = "";
  if (expiration) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expiration * 1000);
    expirationStr = `expires=${expirationDate.toUTCString()}; `;
  }
  document.cookie = `${key}=${value}; SameSite=Lax; ${expirationStr}path=/`;
}

function getCookie(key: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.split("=")[1];
}

const AUTH_TOKEN_KEY = "access_token";

export function setAuthTokenCookie(token: string, expiration?: number) {
  setCookie(AUTH_TOKEN_KEY, token, expiration);
}

export function getAuthTokenCookie(): string | undefined {
  return getCookie(AUTH_TOKEN_KEY);
}

const REFRESH_TOKEN_KEY = "refresh_token";

export function setRefreshTokenCookie(token: string, expiration?: number) {
  setCookie(REFRESH_TOKEN_KEY, token, expiration);
}

export function getRefreshTokenCookie(): string | undefined {
  return getCookie(REFRESH_TOKEN_KEY);
}

function clearCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; path=/`;
}

/**
 * Clear all auth cookies
 */
export function clearCookies() {
  [AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach((key) => clearCookie(key));
}
