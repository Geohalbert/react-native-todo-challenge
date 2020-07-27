"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_navigation_1 = require("react-navigation");
var AppNavigator_1 = __importDefault(require("./app/navigation/AppNavigator"));
var react_redux_1 = require("react-redux");
var task_store_1 = __importDefault(require("./app/store/task.store"));
var App = function () {
    var AppContainer = react_navigation_1.createAppContainer(AppNavigator_1.default);
    return (<react_redux_1.Provider store={task_store_1.default}>
      <AppContainer />
    </react_redux_1.Provider>);
};
exports.default = App;
