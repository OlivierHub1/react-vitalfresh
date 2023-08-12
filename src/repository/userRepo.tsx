import React, { useState, useEffect } from "react";
import { ref, onValue, remove, set, push, get, child } from "firebase/database";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { db, storage } from "../firebase";
import { User } from "../entities/user";

export const getUsersData = () => {
  const [todoData, setTodoData] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(db, "user/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      //console.log(newPosts)
      setTodoData(newPosts);
    });
  }, []);
  return todoData;
};

export const getUserData = (userId) => {
  const [userData, setUserData] = useState(new User());
  useEffect(() => {
    const usersRef = ref(db, "user/" + userId);
    get(usersRef)
      .then((snapshot) => {
        const data = snapshot.val();
        setUserData(data);
        //console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return userData;
};

export const addNewUser = (
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
  const usersRef = ref(db, "user/");

  const newUser = {
    email: email,
    file: file,
    firstName: firstName,
    id: id,
    lastName: lastName,
    money: money,
    password: password,
    status: status,
    username: username,
  };

  set(child(usersRef, String(id)), newUser);
};

export const editUserData = (
  email: string,
  file: string,
  oldFile: string,
  firstName: string,
  id: Number,
  lastName: string,
  money: string,
  password: string,
  status: string,
  username: string
) => {
  const usersRef = ref(db, "user/" + id);

  set(usersRef, {
    email: email,
    file: file,
    firstName: firstName,
    lastName: lastName,
    money: money,
    password: password,
    status: status,
    username: username,
  });

  //Delete file
  if (file != oldFile) {
    const startIndex = oldFile.lastIndexOf("%2F") + 3;
    const endIndex = oldFile.indexOf("?");
    const userRefStorage = storageRef(
      storage,
      "user/" + oldFile.substring(startIndex, endIndex)
    );
    deleteObject(userRefStorage).then(() => {
      console.log("User ancient image remove");
    });
  }
};

export const editMoneyData = (
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
  const usersRef = ref(db, "user/" + id);

  set(usersRef, {
    email: email,
    file: file,
    firstName: firstName,
    lastName: lastName,
    money: money,
    password: password,
    status: status,
    username: username,
  });
};

export const deleteUserData = (userId: number, userFile: string) => {
  //Delete user
  const usersRef = ref(db, "user/" + userId);

  //Delete file
  const startIndex = userFile.lastIndexOf("%2F") + 3;
  const endIndex = userFile.indexOf("?");
  const userRefStorage = storageRef(
    storage,
    "user/" + userFile.substring(startIndex, endIndex)
  );

  remove(usersRef).then(() => {
    console.log("User " + userId + " remove");
  });
  deleteObject(userRefStorage).then(() => {
    console.log("User image remove");
  });
};
