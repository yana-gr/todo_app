import React from "react";

import Task from "../task";
import "./task-list.css";

const TaskList = ({ tasks, onDeleted }) => {
  const elements = tasks.map((item) => {
    const { status, id, ...itemProps } = item;
    return (
      <li key={id} className={status}>
        <Task {...itemProps} onDeleted={() => onDeleted(id)} />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
