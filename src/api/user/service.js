import axios from 'axios';
import { UserEntity } from './entity';

export class UserService {
  currentUser: UserEntity = null;

  hydrate(user) {
    return new UserEntity(user.uuid, user.username, user.roles);
  }

  resolveUser() {
    return axios.get('backend://users/me')
      .then((response) => this.currentUser = this.hydrate(response.data));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  resetPassword(email) {
    return axios.post(`backend://users/${email}/reset-password`);
  }
}
