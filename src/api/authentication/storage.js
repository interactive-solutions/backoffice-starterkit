/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

import { AccessToken } from './token';

export class AuthenticationStorage {
  accessToken: AccessToken = null;

  constructor() {
    this.fromLocalStorage();
  }

  write(accessToken: AccessToken) {
    localStorage.setItem('auth:accessToken', accessToken.accessToken);
    localStorage.setItem('auth:ownerId', accessToken.ownerId);
    localStorage.setItem('auth:refreshToken', accessToken.refreshToken);
    localStorage.setItem('auth:expiresAt', accessToken.expiresAt.toString());
    localStorage.setItem('auth:tokenType', accessToken.type);

    this.accessToken = accessToken;
  }

  read(): AccessToken {
    return this.accessToken;
  }

  clear(): void {
    this.accessToken = null;

    localStorage.removeItem('auth:accessToken');
    localStorage.removeItem('auth:refreshToken');
    localStorage.removeItem('auth:ownerId');
    localStorage.removeItem('auth:expiresAt');
    localStorage.removeItem('auth:tokenType');
  }

  hasAccessToken(): boolean {
    return this.accessToken !== null;
  }

  fromLocalStorage(): void {
    const accessToken = localStorage.getItem('auth:accessToken');
    const ownerId = localStorage.getItem('auth:ownerId');
    const refreshToken = localStorage.getItem('auth:refreshToken');
    const expiresAt = localStorage.getItem('auth:expiresAt');
    const tokenType = localStorage.getItem('auth:tokenType');

    if (accessToken === null || refreshToken === null) {
      return;
    }

    this.accessToken = new AccessToken(accessToken, ownerId, parseInt(expiresAt), refreshToken, tokenType);
  }
}
