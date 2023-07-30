import { User } from "../entities/user";
import { deleteUserData, getUserData, getUsersData } from "../repository/userRepo";

export const getUsers = () => {
  const users = getUsersData();
  return users;
};

export const getUser = (userId:number) => {
  const users = getUserData(userId);
  return users;
};

export const deleteUser = (userId:number) => {
  deleteUserData(userId)
}

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
