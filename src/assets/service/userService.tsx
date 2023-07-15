import React from 'react';
import userData from '../data/user.json';
import { User } from '../entities/user';

export class UserService {
  users = userData.user.map((userData) => new User(
    userData.id,
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.email,
    userData.password,
    userData.file,
    userData.money,
    userData.status || false
  ));

  getUsers() {
    return this.users;
  }

  /*addUser(id, firstName, lastName, username, email, password, file, money, status) {
    const newUser = new User(id, firstName, lastName, username, email, password, file, money, status);
    this.users.push(newUser);
    return newUser;
  }*/
}

