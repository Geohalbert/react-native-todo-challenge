import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Initializing from "../screens/Initializing";
import HomeScreen from "../screens/HomeScreen";
import SaveTaskScreen from "../screens/SaveTaskScreen";

// default style
const defaultStyle = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#ccebff"
  },
  headerTitleStyle: {
    textAlign: "center",
    flexGrow: 1,
    alignSelf: "center"
  }
};

// initial app stack
const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Tasks",
      ...defaultStyle
    }
  },
  SaveTask: {
    screen: SaveTaskScreen,
    navigationOptions: {
      ...defaultStyle
    }
  }
});

// app navigation logic
export default createAppContainer(
  createSwitchNavigator(
    {
      Init: Initializing,
      App: AppStack
    },
    {
      initialRouteName: "Init"
    }
  )
);
