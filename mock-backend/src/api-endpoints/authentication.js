import { userDatabase as db } from '../mock-data/user-database';
import { oauth } from '../mock-data/oauth';

/**
 * @param app The express app.
 */
export const addAuthenticationAPI = (app) => {
  app.post('/oauth/token', (req, res) => {
    if (!req) {
      console.warn('Error. !req');
      res.sendStatus(400);
      return;
    }

    if (!req.body) {
      console.warn('Error. !req.body');
      res.sendStatus(400);
      return;
    }

    if (!req.body.grant_type) {
      console.warn('Error. !req.body.grant_type');
      res.status(400).send({ error: 'Error. grant_type is missing.' });
      return;
    }

    const grantType = req.body.grant_type;
    const { username, password } = req.body;

    if (grantType === 'password') {
      console.log('login.');

      oauth.invalidateOldAccessTokens();

      // check if username and password is correct.
      if (username !== db.username) {
        console.warn('Error. Username is incorrect');
        res.status(401).send({ error: 'Error. Username is incorrect.' });
        return;
      }

      if (password !== db.password) {
        console.warn('Error. Password is correct');
        res.status(401).send({ error: 'Error. Password is incorrect.' });
        return;
      }

      res.json({
        access_token: oauth.accessToken,
        token_type: 'Bearer',
        expires_in: 30000,
        owner_id: oauth.ownerId,
        refresh_token: oauth.refreshToken
      });
    } else if (grantType === 'refresh_token') {
      console.log('refresh.');

      oauth.invalidateOldAccessTokens();
      
      /**
       * Check the 'refresh_token' body data field.
       * Should exist.
       * Should be correct.
       */

      const refreshToken = req.body.refresh_token;
      if (!refreshToken) {
        res.status(403).send({ error: 'Error. No refresh_token header.' });
        return;
      }

      if (refreshToken !== db.refreshToken) {
        res.status(403).send({ error: 'Error. Invalid refresh token.' });
        return;
      }
      
      // otherwise everything is fine, so
      // emit new tokens.

      res.json({
        access_token: db.accessToken,
        token_type: 'Bearer',
        expires_in: 30000,
        owner_id: db.ownerId,
        refresh_token: db.refreshToken
      });
    } else {
      console.log('Error. Default case.');
    }
  });
};
