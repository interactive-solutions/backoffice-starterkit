/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

export function AccessToken(token: string, ownerId: any, expiresAt: number, refreshToken: string, type: string) {
  this.accessToken = token;
  this.ownerId = ownerId;
  this.expiresAt = expiresAt;
  this.refreshToken = refreshToken;
  this.type = type;

  return Object.freeze(this);
}
