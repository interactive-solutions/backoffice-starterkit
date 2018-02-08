import { oauth } from './mock-data/oauth';

/**
 * Used when an API requires authentication.
 * 
 * returns true if authentication succeeds
 * otherwise returns false
 */
export const requiresAuthentication = (req, res) => {
  oauth.invalidateOldAccessTokens();

  if (!req) {
    console.warn('Error. !req');
    res.status(401).send({ error: 'Error. No request.' });
    return false;
  }

  /**
   * Check if Authorization header exists.
   * 
   * Check if that has a value of: `Bearer ${accessToken}`
   * 
   * Send back uuid etc.
   */
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    console.warn("Error. !req.get('Authorization')");
    res.status(401).send({ error: 'Error. No Authorization header.' });
    return false;
  }

  if (!/^Bearer \d*$/.test(authorizationHeader)) {
    console.warn('Error. Authorization header has incorrect format.');
    console.warn('Authorization header:');
    console.warn(JSON.stringify(authorizationHeader, null, 2));
    res.status(401).send({ error: 'Error. Authorization header malformed.' });
    return false;
  }

  // grab access_token from header
  const accessToken = authorizationHeader.split(' ')[1];
  // check if accessToken is correct.
  if (accessToken !== oauth.accessToken) {
    console.warn('Error. Access token was incorrect.');
    console.warn('accessToken:');
    console.warn(accessToken);
    console.warn(`expected: ${oauth.accessToken}`);
    res.status(401).send({ error: 'Error. Incorrect access token.' });
    return false;
  }

  return true;
};
