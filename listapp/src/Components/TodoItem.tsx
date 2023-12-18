import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkItem, deleteItem } from "./redux/actions";

interface Props{
   task: any,
   editValue:any
}



const TodoItem: React.FC<Props> = ({ task, editValue }) => {
  const dispatch = useDispatch(); 
  const items = useSelector((state: any) => state.content.items);

    useEffect(() => {
    console.log("chnaged in app", items);
  }, [items]);
  return (
    <div className={`todo-item row ${task.complete ? "strike" : ""}`}>
      <div
        onClick={() => dispatch(checkItem(task.id))}
        className={`check-btn ${task.complete ? "checked" : "unchecked"}`}
      ></div>
      <p>{task.name}</p>
      <div className="btns">
        <button onClick={() => editValue(task.id)}>Edit</button>

        <button onClick={() => dispatch(deleteItem(task.id))}>X</button>
      </div>
    </div>
  );
}
export default TodoItem;
