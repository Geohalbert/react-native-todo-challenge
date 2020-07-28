import {
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK
  } from "../constants/task.constants";
  
  // fetch
  export const getTasks = (tasks: ObjectArray) => ({
    type: GET_TASKS,
    data: { tasks }
  });
  
  // create
  export const createTask = (task: object)  => ({
    type: ADD_TASK,
    data: { task }
  });
  
  // update
  export const updateTask = (task: object) => ({
    type: UPDATE_TASK,
    data: { task }
  });
  
  // delete
  export const deleteTask = (id: number) => ({
    type: DELETE_TASK,
    data: { id }
  });
  