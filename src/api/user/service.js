import axios from 'axios';
import { UserEntity } from './entity';

export class UserService {
  currentUser: UserEntity = null;

  resolveUser() {
    return axios.get('backend://users/me')
      .then((response) => this.currentUser = UserEntity.create(response.data));
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
  resetPassword(nonce, password) {
    return axios.post('backend://set-new-password', { nonce, password });
  }

  logout() {
    this.currentUser = null;
  }

  create(username, roles) {
    return axios.post('backend://users', { username, roles: [roles] });
  }

  hydrateArray(data) {
    return data.map(this.hydrate);
  }

  getUsers() {
    return axios.get('backend://users')
      .then(response => response.data);
  }

  search(username) {
    return axios.get('backend://users/search', { params: { username } })
      .then(response => response.data);
  }
}
