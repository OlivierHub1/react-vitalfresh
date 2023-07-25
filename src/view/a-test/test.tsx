import React, { useState, useEffect } from "react";
import { ref, onValue, child } from "firebase/database";
import { db } from "../../firebase";

export const Test = () => {
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
            return <li key={index}>{item.id}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

/*let ref = database.ref("/buyers");
      ref.on("value", snapshot => {
      const data = snapshot.val()
      console.log(data)
      })*/
