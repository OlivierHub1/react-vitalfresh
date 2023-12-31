export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  file?: string;
  money?: string;
  status?: string;

  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    username?: string,
    email?: string,
    password?: string,
    file?: string,
    money?: string,
    status?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.file = file;
    this.money = money;
    this.status = status;
  }
}
