import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#56CCF0]`,
  container: `bg-slate-200 max-w-[500px] rounded-lg p-5 w-full  m-auto shadow-xl`,
  heading: `text-3xl text-slate-800 font-bold text-center text-shadow p-6 text-[3rem]`,
  form: `flex justify-between`,
  input: `w-[24rem] p-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent mb-2`,
  button: `bg-blue-400 p-2 rounded-lg border-2 border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-100 mb-2`,
  count: `text-slate-800 text-center text-shadow p-6 text-[1rem]`,
};

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");
  // console.log(input);

  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  //Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  //Delete todo from firebase
  const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
  


  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>#Task-Master</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className={style.input}
            placeholder="add and master it"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p
            className={style.count}
          >{`You have ${todos.length} tasks to complete`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
