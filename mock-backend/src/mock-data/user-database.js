/**
 * Currently keeps the data for only one user.
*/
export const userDatabase = {
  /**
   * Active user
   */
  uuid: '1',
  roles: [
    'admin'
  ],
  username: 'admin',
  password: 'helloWorld',
  createdAt: '2018-01-31T12:16:23+00:00',
  updatedAt: '2018-01-31T12:16:23+00:00',

  nonce: '1', // when a user sets a new password

  /**
   * All users.
   */

  users: [
    { uuid: 0, username: 'Adam', roles: ['guest'] },
    { uuid: 1, username: 'Beatrice', roles: ['guest'] },
    { uuid: 2, username: 'Carl', roles: ['guest'] },
    { uuid: 3, username: 'David', roles: ['guest'] },
    { uuid: 4, username: 'Emily', roles: ['guest'] },
    { uuid: 5, username: 'Felicia', roles: ['guest'] }
  ],

  // stores the uuid counter value. primary key id in database terms.
  highestUuidYet: 5
};
