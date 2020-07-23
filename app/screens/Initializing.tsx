import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

  interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }

import localData from "../utils/db.json";

// this "screen" basically loads the data and then navigates to the app
const Initializing:React.FC<Props> = props => {

    const { navigation } = props;
  useEffect(() => checkLocalData(), []);

  function checkLocalData() {
    AsyncStorage.getItem("tasks", (err, data) => {
      if (data === null) {
        AsyncStorage.setItem("tasks", JSON.stringify(localData.tasks));
        navigation.navigate("App");
      } else {
        navigation.navigate("App");
      }
    });
  }

  return <AppLoading />;
}

export default Initializing;