import { combineReducers } from "redux";

import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "../constants/task.constants";

let dataState = { tasks: [] };

const dataReducer = (state = dataState, action: any = {}) => {
  switch (action.type) {
    case GET_TASKS:
      let { tasks } = action.data;

      return { ...state, tasks };

    case ADD_TASK:
      let { task } = action.data;
      let clone = JSON.parse(JSON.stringify(state.tasks));

      clone.push(task);
      return { ...state, tasks: clone };

    case UPDATE_TASK: {
      let { task } = action.data;
      let clone = JSON.parse(JSON.stringify(state.tasks));

      // verifying that task exists
      const index = clone.findIndex((obj: any) => obj['id']=== task.id);

      // update if task exists
      if (index !== -1) clone[index] = task;

      return { ...state, tasks: clone };
    }

    case DELETE_TASK: {
      let { id } = action.data;
      let clone = JSON.parse(JSON.stringify(state.tasks));

      // verifying that task exists
      const index = clone.findIndex((obj: any) => obj['id'] === id);

      // remove if task exists
      if (index !== -1) clone.splice(index, 1);

      return { ...state, tasks: clone };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({ dataReducer });

export default rootReducer;
