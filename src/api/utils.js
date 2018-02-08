import {
  authenticationStorage,
  authenticationService
} from './index';
import environment from './environment';

export const apiUriInterceptor = (request) => {
  if (request.url.startsWith('backend://')) {
    request.url = request.url.replace('backend://', environment.apiUrl); // 'http://api.duocircle.s2.isdemo.se/');
  }

  if (request.url.startsWith('static://')) {
    request.url.replace('static://', environment.staticUri);
  }

  return request;
};

export const authorizationHeaderInterceptor = (request: any) => {
  if (request.url.indexOf('/oauth/token') !== -1) {
    return request;
  }

  const token = authenticationStorage.read();
  if (token && !request.disableAuthorizationHeader) {
    request.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return request;
};

/**
 * Checks if we receive a 401 Unauthorized.
 * If so then first try to refresh,
 * then if we still get a 401, log out the user.
 */
export const refreshTokenInterceptor = (response: any) => {
  console.log('\n= refreshTokenInterceptor =\n'); // eslint-disable-line
  // Grab HTTP status code.
  const { status } = response;
  console.log(`status: ${status}`); // eslint-disable-line
  if (status !== 401) {
    return response;
  }

  // debugger; // eslint-disable-line

  const token = authenticationStorage.read();
  if (token && !response.disableAuthorizationHeader) {
    // const { refreshToken } = token;
    authenticationService.refresh(); // todo should only do this once.
  }

  return response;
};
