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

  /**
   * When a user has forgotten their password
   * and asks for a new.
   */
  forgotPassword(email) {
    return axios.post(`backend://users/${email}/reset-password`);
  }

  /**
   * When user sets the new password.
   */
  resetPassword(nounce, password) {
    return axios.post('backend://set-new-password/', { nounce, password });
  }

  logout() {
    this.currentUser = null;
  }
}
