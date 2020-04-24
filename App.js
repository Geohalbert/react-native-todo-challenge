import React from "react";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const AppContainer = createAppContainer(AppNavigator);
  return <AppContainer />;
}
