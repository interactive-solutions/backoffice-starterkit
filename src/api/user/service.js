import axios from 'axios';
import { UserEntity } from './entity';

export class UserService {
  currentUser: UserEntity = null;
  users: UserEntity[] = [];

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
  resetPassword(nonce, password) {
    return axios.post('backend://set-new-password', { nonce, password });
  }

  logout() {
    this.currentUser = null;
  }

  create(username, roles) {
    return axios.post('backend://users', { username, roles: [roles] })
      .then((response) => this.users = this.hydrateArray(response.data)); // todo remove this temporary fix.
  }

  hydrateArray(data) {
    return data.map(this.hydrate);
  }

  resolveUsers() {
    return axios.get('backend://users')
      .then((response) => this.users = this.hydrateArray(response.data));
  }

  getUsers() {
    return this.users;
  }

  search(username) {
    return axios.get('backend://users/search', { params: { username } })
      .then((response) => this.users = this.hydrateArray(response.data));
  }
}
