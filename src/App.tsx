import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Task } from './types/types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filter from './components/Filter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './styles/App.css';
import './styles/index.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all'
  );

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, text: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text } : task
    );
    setTasks(updatedTasks);
  };

  const toggleCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const filterCompleted = () => {
    return tasks.filter((task) => task.isCompleted);
  };

  const filterIncomplete = () => {
    return tasks.filter((task) => !task.isCompleted);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  let filteredTasks: Task[] = tasks;

  if (filter === 'completed') {
    filteredTasks = filterCompleted();
  } else if (filter === 'incomplete') {
    filteredTasks = filterIncomplete();
  }

  return (
    <div className="App container fs-6">
      <h1>Todo List</h1>
      <TodoForm addTask={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
              <TodoList
                tasks={filteredTasks}
                deleteTask={removeTask}
                editTask={editTask}
                toggleTask={toggleCompletion}
              />
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
