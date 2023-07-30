import React, { useState, useEffect } from "react";
import { ref, onValue, remove, set, push, get } from "firebase/database";
import { uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 } from "uuid";
import { User } from "../entities/user";

export const getUsersData = () => {
  const [todoData, setTodoData] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(db, "user/");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      //console.log(newPosts)
      setTodoData(newPosts);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return todoData;
};

export const getUserData = (userId) => {
  const [userData, setUserData] = useState(new User);
  useEffect(() => {
    const usersRef = ref(db, "user/" + userId);
    get(usersRef)
  .then((snapshot) => {
    const data = snapshot.val();
    setUserData(data)
    console.log(data);
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
  push(usersRef, {
    email: email,
    file: file,
    firstName: firstName,
    id: id,
    lastName: lastName,
    money: money,
    password: password,
    status: status,
    username: username,
  });
};

export const deleteUserData = (userId: number) => {
  const usersRef = ref(db, "user/" + userId);
  remove(usersRef).then(() => {
    console.log("User " + userId + " remove");
  });
};
