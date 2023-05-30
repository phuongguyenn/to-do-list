import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
// test commit 2
// do sth else at main
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      const canBeAdd = !tasks.find(value => value.text == action.text)
      if (canBeAdd) {
        return  [{
          id: action.id,
          text: action.text,
          done: false
        }, ...tasks, ];
      } else {
        action.onError('mesaage');
        return tasks;
      }

    }
    case 'updated': {
      return tasks.map(t => {
        if (t.id === action.id) {
          t.text = action.text;
        }
        return t;
      });
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'allTasks': {
      return [];
    }
    case 'doneTasks': {
      return tasks.filter(t => !t.done);
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Learn ReactJS basics', done: true },
  { id: 1, text: 'Practice ReactJS', done: false },
  { id: 2, text: 'Code portfolio in ReactJS', done: false },
  { id: 3, text: 'Learn React Native', done: false },
  { id: 4, text: 'Learn Redux', done: false }
];
