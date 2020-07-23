import React from "react";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./app/navigation/AppNavigator";
import { Provider } from "react-redux";

import store from "./app/store/task.store";

const App: React.FC = () => {
  const AppContainer = createAppContainer(AppNavigator);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;