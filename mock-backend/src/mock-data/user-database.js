/**
 * Currently keeps the data for only one user.
*/
export const userDatabase = {
  uuid: '1',
  roles: [
    'admin'
  ],
  username: 'admin',
  password: 'qwerty',
  createdAt: '2018-01-31T12:16:23+00:00',
  updatedAt: '2018-01-31T12:16:23+00:00',

  nounce: '1' // when a user sets a new password
};
