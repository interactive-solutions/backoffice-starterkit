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
};
