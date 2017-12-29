
export class UserEntity {
  constructor(id: number,
              username: string,
              email: string,
              roles: string[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
