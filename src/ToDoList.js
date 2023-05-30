import React, { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function ToDoList(props) {
  const tasks = useTasks()
  const dispatch = useTasksDispatch();
  const [all, setAll] = useState(tasks);


  const setText = props.setText;
  const setEditTaskId = props.setEditTaskId;

  React.useEffect(() => setAll(tasks), [tasks])
  // const [showing, setShowing] = useState (tasks);

  return (
    <>
      <div className='selected'>
        <button
          className='all'
          onClick={() => setAll(tasks.filter(a => a.text))}>All</button>

        <button
          className='done'
          onClick={() => setAll(tasks.filter(a => a.done))}>Done</button>

        <button
          className='todo'
          onClick={() => setAll(tasks.filter(a => !a.done))}>To Do</button>
      </div>

      <ul>
        {all
        .sort((a,b) => a.done - b.done)
        .map(task => (
          <li key={task.id}>
            <Task task={task} setText={setText} setEditTaskId={setEditTaskId} />
          </li>
        ))}
      </ul>
      <div className='deleted'>
        <button
          className='allTasks'
          onClick={() => {
            dispatch({
              type: 'allTasks',
              id: tasks.text
            });
          }}>Delete all tasks</button>

        <button
          className='doneTasks'
          onClick={() => {
            dispatch({
              type: 'doneTasks',
              id: tasks.done
            });
          }}>Delete done tasks</button>
      </div>
    </>

  );
}

function Task({ task, setText, setEditTaskId }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();


  let style;
  if (task.done === true) { style = { textDecorationLine: 'line-through', color: 'red' } }
  else { style = {} }

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />

      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
      </>
    );
  }
  return (
    <>
      <div
        style={style}
      >
        {taskContent}
      </div>

      <div>
        <input
          type="checkbox"
          checked={task.done}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                done: e.target.checked
              }
            });
          }}
        />

        <button
          onClick= {() => {
            if(task.done === false) {
              setText(task.text);
            setEditTaskId(task.id)
            }
          }}
          className='svgList'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <button
          className='svgDelete'
          onClick={() => {
            dispatch({
              type: 'deleted',
              id: task.id
            });
          }}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div >

    </>

  );
}