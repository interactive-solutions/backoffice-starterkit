import { requiresAuthentication } from '../requires-authentication';
import { userDatabase as db } from '../mock-data/user-database';

/**
 * @param app The express app.
 */
export const addUserAPI = (app) => {
  /**
   * Request info about my account
   */
  app.get('/users/me', (req, res) => {
    console.log('GET /users/me');
    
    if (!requiresAuthentication(req, res)) {
      return;
    }

    res.json({
      uuid: db.uuid,
      roles: db.roles,
      username: db.username,
      createdAt: db.createdAt,
      updatedAt: db.updatedAt
    });
  });

  /**
   * Request a list of all users
   */
  app.get('/users', (req, res) => {
    console.log('GET /users');
    
    if (!requiresAuthentication(req, res)) {
      return;
    }

    res.json(db.users);
  });

  /**
   * Create one user
   */
  app.post('/users', (req, res) => {
    console.log('POST /users');

    if (!requiresAuthentication(req, res)) {
      return;
    }

    if (!req.body) {
      console.warn('Error. !req.body');
      res.sendStatus(400);
      return;
    }

    const { username, roles } = req.body;

    if (!username || !roles) {
      console.warn('Error. Username is missing.');
      res.status(400).send({ error: 'Error. Username is missing.' });
      return;
    }

    if (!roles) {
      console.warn('Error. Roles is missing.');
      res.status(400).send({ error: 'Error. Roles is missing.' });
      return;
    }
    
    // so the data is valid
    // calc new uuid
    db.highestUuidYet++;
    const uuid = db.highestUuidYet;
    // add new user.
    db.users.push({ uuid, username, roles });

    // send back all users.
    res.json(db.users);
  });

  /**
   * Search users by username
   */
  app.get('/users/search', (req, res) => {
    console.log('GET /users/search');

    if (!requiresAuthentication(req, res)) {
      return;
    }

    if (!req.body) {
      console.warn('Error. !req.body');
      res.sendStatus(400);
      return;
    }

    // grab query params.
    const { username } = req.query;

    if (!username) {
      console.warn('Error. Username is missing.');
      res.status(400).send({ error: 'Error. Username is missing.' });
      return;
    }

    // The search logic.
    const searchResults = db.users.filter(user => {
      return user.username.toLowerCase()
        .includes(username.toLowerCase());
    });

    // send back all users.
    res.json(searchResults);
  });

  /**
   * Request a specific user
   */
  app.get('/users/:uuid', (req, res) => {
    console.log('GET /users/:uuid');
    const { uuid } = req.params;
    
    if (!requiresAuthentication(req, res)) {
      return;
    }

    // todo. do error checking. if not found etc.
    db.users.find(user => user.uuid === uuid);

    res.json(db.users);
  });
};
