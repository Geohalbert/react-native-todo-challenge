import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "../constants/task.constants";

// fetch
export const getTasks = tasks => ({
  type: GET_TASKS,
  data: { tasks }
});

// create
export const createTask = task => ({
  type: ADD_TASK,
  data: { task }
});

// update
export const updateTask = task => ({
  type: UPDATE_TASK,
  data: { task }
});

// delete
export const deleteTask = id => ({
  type: DELETE_TASK,
  data: { id }
});
