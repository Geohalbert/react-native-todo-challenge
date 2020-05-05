import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../redux/reducers/task.reducers";

export default createStore(reducers, applyMiddleware(thunk));
