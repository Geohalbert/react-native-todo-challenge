import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/task.reducers";

export default createStore(reducers, applyMiddleware(thunk));
