import React, { useState } from "react";
import { Task } from "../types/types";

interface TodoFormProps {
  addTask: (task: Task) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    const newTask: Task = {
      id: Math.random(),
      text: text,
      isCompleted: false,
    };
    addTask(newTask);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          aria-label="Add a new task..."
          aria-describedby="button-add"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-add"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
