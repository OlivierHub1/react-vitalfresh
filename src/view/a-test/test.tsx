import React, { useState, useEffect } from "react";
import { ref, onValue, child, get } from "firebase/database";
import { db } from "../../firebase";
import { User } from "../../assets/entities/user";

/*export const Test = () => {
  const [todoData, setTodoData] = useState([]);
  useEffect(() => {
    const startCountRef = ref(db, "user/");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    });
  }, []);

  return (
    <>
      <div>
        <ul>
          {todoData.map((item, index) => {
              return <li key={index}>{item.username}</li>;
          })}
        </ul>
      </div>
    </>
  );
};*/

export const Test = () => {
  const [userData, setUserData] = useState(new User);
  useEffect(() => {
    const startCountRef = ref(db, "user/");
    get(startCountRef)
  .then((snapshot) => {
    const data = snapshot.val();
    setUserData(data)
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
});
  }, []);

  return (
    <>
      <div className="mt-5">
        {userData.email}
      </div>
    </>
  );
};