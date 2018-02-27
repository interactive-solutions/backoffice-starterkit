
export class UserEntity {
  constructor(
    uuid: number,
    username: string,
    roles: string[]
  ) {
    this.uuid = uuid;
    this.username = username;
    this.roles = roles;
  }

  static create(user) {
    return new UserEntity(user.uuid, user.username, user.roles);
  }
}
