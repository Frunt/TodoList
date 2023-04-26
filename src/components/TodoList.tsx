import React from "react";
import { Task } from "../types/types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  toggleTask,
  deleteTask,
  editTask,
}) => {
  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <TodoListItem
          index={index}
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;
