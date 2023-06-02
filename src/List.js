import AddTask from './AddTask.js';
import ToDoList from './ToDoList.js';
import { TasksProvider } from './TasksContext.js';
import './App.css';
import { useState } from 'react';


function List() {
  const [text, setText] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  return (
    <div className='form-todo'>
      <TasksProvider>
        <h1>To Do Input</h1>
        <AddTask text={text} setText={setText} editTaskId={editTaskId} setEditTaskId={setEditTaskId} />
        <h1>To Do List</h1>
        <ToDoList setText={setText} setEditTaskId={setEditTaskId} />
      </TasksProvider>
    </div>

  );
}
export default List;