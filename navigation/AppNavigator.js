import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Initializing from "../screens/Initializing";
import HomeScreen from "../screens/HomeScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import ViewTaskScreen from "../screens/ViewTaskScreen";

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
  CreateTask: {
    screen: CreateTaskScreen,
    navigationOptions: {
      ...defaultStyle
    }
  },
  ViewTask: {
    screen: ViewTaskScreen,
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
