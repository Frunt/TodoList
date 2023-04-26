import React, { useState } from "react";
import { Task } from "../types/types";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Draggable } from 'react-beautiful-dnd';

interface TodoListItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  index: number;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  task,
  toggleTask,
  deleteTask,
  editTask,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(task.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText("");
  };

  const handleSaveEdit = () => {
    editTask(task.id, editedText);
    setIsEditing(false);
    setEditedText("");
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  return (
    <Draggable draggableId={task.id + ''} index={index}>
      {(provided, snapshot) => (
 
    <li className={`card list-group-item d-flex justify-content-between align-items-center ${
        task.isCompleted ? 'completed' : ''
      } ${snapshot.isDragging ? 'dragging' : ''}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}>
      {!isEditing ? (
        <>
          <div className="form-check d-flex justify-content-between align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              checked={task.isCompleted}
              onChange={handleToggle}
            />
            <label
              className={task.isCompleted ? "form-check-label completed" : "form-check-label"}
            >
              {task.text}
            </label>
          </div>
          <div className="ml-auto">
            <button className="btn btn-light btn-sm" onClick={handleEdit}>
              <FiEdit />
            </button>
            <button className="btn btn-light btn-sm" onClick={handleDelete}>
              <FaTrashAlt />
            </button>
          </div>
        </>
      ) : (
        <>
          <input type="text" className="form-control" value={editedText} onChange={handleTextChange} />
          <div className="ml-auto">
            <button className="btn btn-primary btn-sm mr-2" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </>
      )}
    </li>)}
    </Draggable>
  );
};

export default TodoListItem;
