import React, { createContext, ReactNode, FC, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  clearCookies,
  getAuthTokenCookie,
  getRefreshTokenCookie,
  setAuthTokenCookie,
  setRefreshTokenCookie,
} from './cookies';
import { createInterceptors, removeInterceptors } from './instance';
import { buildLogoutHref, oauthAuthorize, oauthRefresh, OAuthResponse } from './routes';

interface AuthContext {
  /**
   * In a transition from not logged in to logged in
   */
  loading: boolean;
  /**
   * User is currently logged in (undefined if loading)
   */
  authenticated?: boolean;
  /**
   * Any error returned by the IDP
   */
  error?: Error;
  /**
   * Log the user in
   */
  authorize: (callback: string) => Promise<void>;
  /**
   * Log the user out and redirect to the login screen
   */
  logout: () => Promise<void>;
}

export const authContext = createContext<AuthContext>({
  loading: true,
  authenticated: false,
  authorize: async () => undefined,
  logout: async () => undefined,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [error, setError] = useState<Error>();

  const [interceptorIds, setInterceptorIds] = useState<[number, number]>();

  const location = useLocation();

  function setCookies({ access_token, refresh_token, expires_in }: OAuthResponse) {
    setAuthTokenCookie(access_token, expires_in);
    setRefreshTokenCookie(refresh_token);
  }

  async function refresh() {
    const refreshToken = getRefreshTokenCookie();
    if (refreshToken === undefined) {
      throw new Error('No refresh token provided');
    }

    const response = await oauthRefresh(refreshToken);
    setCookies(response.data);
  }

  async function authorize(code: string) {
    console.log('Authorize called')
    setLoading(true);
    try {
      const response = await oauthAuthorize(code);
      setCookies(response.data);
      setAuthenticated(true);
    } catch (error) {
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    console.log('Logout called')
    clearCookies();
    setAuthenticated(false);
    window.location.href = buildLogoutHref();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ loading, authenticated, error, authorize, logout }), [loading, error, authenticated]);

  // If the page changes, reset the error state
  useEffect(() => {
    // if (value.error && location.pathname !== '/callback') setError(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // If the authentication state changes, reset the loading and error state
  // Also create or remove the auth interceptors
  useEffect(() => {
    if (value.authenticated !== undefined) {
      setLoading(false);
      setError(undefined);

      if (value.authenticated) {
        setInterceptorIds(createInterceptors(refresh, setError, logout));
      } else {
        if (interceptorIds) {
          removeInterceptors(interceptorIds);
          setInterceptorIds(undefined);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.authenticated]);

  // When initially loads, try get access token
  useEffect(() => {
    console.log('initial page load')
    if (getAuthTokenCookie()) {
      setAuthenticated(true);
      return;
    }

    if (getRefreshTokenCookie()) {
      console.log('page load refresh')
      refresh();
      return;
    }

    setAuthenticated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
