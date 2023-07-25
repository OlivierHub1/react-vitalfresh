import React, { useState, useEffect } from "react";
import {uid} from "uid";
import { getDatabase, child, ref, get, onValue } from "firebase/database";
import userData from '../data/user.json';
import { User } from '../entities/user';

/*const userDb = firebase.ref('user');
userDb.on('value', (snapshot) => {
  let users = snapshot.val();
})*/

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
    userData.status
  ));

  getUsers() {
    return this.users;
  }

  addUser(newUser) {
    const user = new User(
      newUser.id,
      newUser.firstName,
      newUser.lastName,
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.file,
      newUser.money,
      newUser.status
    );

    this.users.push(user);
  }

  verifyUserExist(username, password) {
    const user = this.users.find((user) => user.username === username && user.password === password);
    return user !== undefined;
  }

  getUserByUsername(username) {
    return this.users.find((user) => user.username === username);
  }
}

