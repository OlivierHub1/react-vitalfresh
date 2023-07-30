import { User } from "../entities/user";
import {
  addNewUser,
  deleteUserData,
  getUserData,
  getUsersData,
} from "../repository/userRepo";

export const getUsers = () => {
  const users = getUsersData();
  return users;
};

export const getUser = (userId: number) => {
  const users = getUserData(userId);
  return users;
};

export const addUser = (
  email: string,
  file: string,
  firstName: string,
  id: Number,
  lastName: string,
  money: string,
  password: string,
  status: string,
  username: string
) => {
  addNewUser(
    email,
    file,
    firstName,
    id,
    lastName,
    money,
    password,
    status,
    username
  );
};

export const deleteUser = (userId: number, userFile: string) => {
  deleteUserData(userId, userFile);
};

export const getUserByUsername = (username: string) => {
  const users = getUsersData();
  return users.find((user) => user.username === username);
};

export const verifyUserExist = (username: string, password: string) => {
  const users = getUsersData();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user !== undefined;
};
