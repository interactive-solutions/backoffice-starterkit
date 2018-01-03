/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

import axios from 'axios';
import { authenticationStorage } from './index';
import { AccessToken } from './token';

type LoginParams = {
  grant_type: string;
  username: string;
  password: string;
}

export class AuthenticationService {
  refreshPromise: Promise<void> = null;

  /**
   * @param parameters
   *
   * @returns {Promise}
   */
  login(parameters: LoginParams): Promise<void> {
    parameters.grant_type = 'password';

    return axios({
      method: 'POST',
      url: 'backend://oauth/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: parameters,
      transformRequest: [(data) => {
        let str = [];
        for (let p in data) {
          if (data.hasOwnProperty(p) && data[p]) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
          }
        }

        return str.join('&');
      }]
    })
      .then((response: any) => {
        // Time is returned in ms.
        const now = new Date().getTime() / 1000;

        const accessToken = new AccessToken(
          response.data.access_token,
          response.data.owner_id,
          response.data.expires_in + now,
          response.data.refresh_token,
          response.data.token_type
        );

        // Persist it
        authenticationStorage.write(accessToken);
      });
  }

  /**
   * Refresh token
   *
   * @returns {Promise<void>}
   */
  refresh(): Promise<void> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = axios({
      method: 'POST',
      url: 'backend://oauth/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        grant_type: 'refresh_token',
        refresh_token: authenticationStorage.read().refreshToken
      },
      transformRequest: [(data) => {
        let str = [];
        for (let p in data) {
          if (data.hasOwnProperty(p) && data[p]) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
          }
        }

        return str.join('&');
      }]
    })
      .then((response: any) => {
        // Time is returned in ms.
        const now = new Date().getTime() / 1000;

        const accessToken = new AccessToken(
          response.data.access_token,
          response.data.owner_id,
          response.data.expires_in + now,
          response.data.refresh_token,
          response.data.token_type
        );

        // Persist it
        authenticationStorage.write(accessToken);
        this.refreshPromise = null;
      })
      .catch(() => {
        authenticationStorage.clear();
        this.refreshPromise = null;

        // So error can be caught in catch clause
        throw new Error();
      });

    return this.refreshPromise;
  }

  /**
   * Check if the current user is authenticated, does not test if it's still valid tho.
   *
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    const now: number = new Date().getTime() / 1000;
    const token: AccessToken = authenticationStorage.read();

    if (!token) {
      return false;
    }

    return token.expiresAt >= now;
  }

  /**
   * Remove the oauth token and trigger a auth event
   */
  clear(): void {
    // Delete the oauth token
    authenticationStorage.clear();
  }
}
