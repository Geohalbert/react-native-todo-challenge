import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";

import localData from "../utils/db";

// this "screen" basically loads the data and then navigates to the app
export default function Initializing(props) {
  useEffect(() => checkLocalData(), []);

  function checkLocalData() {
    AsyncStorage.getItem("tasks", (err, data) => {
      if (data === null) {
        AsyncStorage.setItem("tasks", JSON.stringify(localData.tasks));
        props.navigation.navigate("App");
      } else {
        props.navigation.navigate("App");
      }
    });
  }

  return <AppLoading />;
}
