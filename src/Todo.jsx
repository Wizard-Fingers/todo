import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
const style = {
  li: `flex justify-between items-center bg-slate-100 rounded-lg mb-2 capitalize bg-opacity-50 bg-green-300 p-2 w-full tp-3`,
  liComplete: `flex justify-between items-center bg-slate-100 rounded-lg mb-2 capitalize bg-opacity-50 bg-yellow-300 p-2 w-full tp-3 line-through`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: "cursor-pointer flex items-center",
};

function Todo({ todo, toggleComplete, deleteTodo: deleteTodo }) {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleComplete(todo)} type="checkbox" unchecked={todo.completed ? "checked" : " "} />
        <p onClick={() => toggleComplete(todo) } className={todo.completed ? style.textComplete : style.text}>
          {todo.text}
        </p>
      </div>
          <button
            onClick={() => deleteTodo(todo.id)}
              className={style.button}>{<FaRegTrashAlt />}</button>
    </li>
  );
}

export default Todo;
