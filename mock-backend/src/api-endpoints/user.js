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
    console.log('/users/me');
    
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
    console.log('/users');
    
    if (!requiresAuthentication(req, res)) {
      return;
    }

    res.json(db.users);
  });

  /**
   * Request a specific user
   */
  app.get('/users/:uuid', (req, res) => {
    console.log('/users');
    const { uuid } = req.params;
    
    if (!requiresAuthentication(req, res)) {
      return;
    }

    // todo. do error checking. if not found etc.
    db.users.find(user => user.uuid === uuid);

    res.json(db.users);
  });
};
