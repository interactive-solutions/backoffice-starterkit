/**
 * Responsible for invalidating access_token and
 * refresh_token.
 */
class Oauth {
  accessToken = '1'
  ownerId = '1'
  refreshToken = '1'
  expires = 0;

  invalidateOldAccessTokens = () => {
    if (this.hasAccessTokenExpired()) {
      console.log(`Invalidating token ${this.accessToken}`);
      this.createNewAccessToken();
    }
  }

  hasAccessTokenExpired = () => {
    console.log('\n= hasAccessTokenExpired =\n');
    console.log(`Date.now(): ${Date.now()}`);
    console.log(`this.expires: ${this.expires}`);

    const diff = Date.now() - this.expires;

    console.log(`diff: ${diff}`);

    return diff > 0;
  }

  createNewAccessToken = () => {
    console.log('\n= createNewAccessToken =\n');
    const accessTokenAsInt = parseInt(this.accessToken, 10);
    this.accessToken = (accessTokenAsInt + 1).toString();

    this.expires = Date.now() + 30000;
  }
}

export const oauth = new Oauth();
