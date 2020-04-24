import React from "react";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";

import store from "./store/task.store"; //Import the store

export default function App() {
  const AppContainer = createAppContainer(AppNavigator);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
