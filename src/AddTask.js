import { useState, useEffect } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function AddTask(onAddTask) {
  const [error, setError] = useState('');
  const dispatch = useTasksDispatch();
  const { text, setText, editTaskId, setEditTaskId } = onAddTask;

  function handelUpdate() {
    if (text) {
      dispatch({
        type: 'updated',
        id: editTaskId,
        text: text,
      })

      setText('')
      setEditTaskId(null);
    } else {
      setError("Please enter the data in the empty box.");
    }

  }

  function handleCreate() {
    // check validate
    if (text) {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
        onError: (message) => {
          setError("This task already exist!!!");
        }
      })
    } else {
      setError("Please enter the data in the empty box.");
    }
  }

  function onInputChange(e) {
    setText(e.target.value); setError()
  }
  function handleSubmit() {
    if (editTaskId !== null) {
      handelUpdate();
    } else {
      handleCreate()
    }
  }

  return (
    <>
      <div className='toDoContent'>

        <div className='rootInput'>
          <FontAwesomeIcon icon={faBook} className='book' />
          <input
            className='inputNewTodo'
            placeholder="New Todo"
            value={text}
            onChange={(e) => onInputChange(e)}
          />

        </div>

        {error && <p> {error}</p>}

        <button
          className='addNewTask'
          onClick={handleSubmit}>{editTaskId !== null ? "Update Task" : "Add new task"}</button>
      </div>
    </>
  );
}

let nextId = 5;
