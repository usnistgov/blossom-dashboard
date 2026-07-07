import axios, { AxiosRequestConfig } from "axios";
import { Buffer } from "buffer";
import { getAuthTokenCookie } from "./cookies";

// Axios instance that manages oauth
export const axiosAuthInstance = axios.create();

export function createInterceptors(
  refresh: () => Promise<void>,
  setError: (error: Error) => void, // Error function
  logout: () => void                // Logout function
): [number, number] {
  // Function to refresh AUTH token
  function refreshRetry(config: AxiosRequestConfig, error: Error) {
    if (!(config as Record<string, unknown>)["_retry"]) {
      (config as Record<string, unknown>)["_retry"] = true;
      return refresh().then(
        (_) => axiosAuthInstance(config),
        (error) => {
          // Set error and auto-logout on error
          setError(error);
          console.log("Logout at line 22 of 'src/api/auth/instance.ts'");
          logout();
        }
      );
    } else {
      // Set error and auto-logout on error
      setError(error);
      console.log("Logout at line 29 of 'src/api/auth/instance.ts'");
      logout();
    }
  }

  return [
    axiosAuthInstance.interceptors.request.use(
      (request) => {
        if (request.headers) {
          request.headers["Authorization"] = `Bearer ${getAuthTokenCookie()}`;
        }
        return request;
    }),
    axiosAuthInstance.interceptors.response.use(
      /* 
      This is teh TypeScript error below formatted for better reading:

      Argument of type 
      '(response: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<void | AxiosResponse<any, any>> | undefined' 
      is not assignable to parameter of type
      '(value___: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>'.
      Type 'AxiosResponse<any, any> | Promise<void | AxiosResponse<any, any>> | undefined' is not assignable to type 'AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>'.
      Type 'undefined' is not assignable to type 'AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>'.ts(2345)
      */
      (response) => {
        if (
          response.config.url === "/rest/auth/graphql" &&
          JSON.parse(Buffer.from(response.data).toString()).data?.errors?.[0]
            ?.message === "Unauthenticated"
        ) {
          return (refreshRetry(
            response.config,
            new Error("refresh request failed?")
          ) 
          ?? 
          Promise.reject(new Error("refresh request failed!")));
        }
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          refreshRetry(error.config, error);
        } else {
          return Promise.reject(error);
        }
      }
    ),
  ];
}

export function removeInterceptors([requestId, responseId]: [number, number]) {
  axios.interceptors.request.eject(requestId);
  axios.interceptors.response.eject(responseId);
}
