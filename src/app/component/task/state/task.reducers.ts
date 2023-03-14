import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  addTaskSuccess,
  deleteTaskSuccess,
  loadDataSuccess,
  resetTasks,
  updateTaskSuccess,
} from './task.action';
import { intialState } from './task.state';

const _tasksReducer = createReducer(
  intialState,
  on(addTaskSuccess, (state, action) => {
    let task = { ...action.task };
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),
  on(loadDataSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
      projectDetails: action.projectDetails,
    };
  }),
  on(updateTaskSuccess, (state, action) => {
    let updatedTask = action.task;

    const tasks = state.tasks.map((data) => {
      if (data._id == action.task._id) {
        if (action.task.task_status == 'done') {
          let currentDate = new Date();
          updatedTask = {
            ...updatedTask,
            completedAt: currentDate.toDateString(),
          };
        }
        return updatedTask;
      } else {
        return data;
      }
    });
    return {
      ...state,
      tasks,
    };
  }),
  on(deleteTaskSuccess, (state, action) => {
    const updatedTask = action.task;
    const tasks = state.tasks.filter((data) => data._id != action.task._id);
    return {
      ...state,
      tasks,
    };
  }),
  on(resetTasks, (state, action) => {
    return { ...state, tasks: [] };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
