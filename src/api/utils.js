import { authenticationStorage } from './index';
import environment from './environment';

export const apiUriInterceptor = (request) => {
  if (request.url.startsWith('backend://')) {
    request.url = request.url.replace('backend://', environment.apiUrl);
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
