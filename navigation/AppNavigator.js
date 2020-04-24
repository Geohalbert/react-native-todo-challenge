import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// screens
import HomeScreen from "../screens/HomeScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";

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
  }
});

// app navigation logic
export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack
    },
    {
      initialRouteName: "App"
    }
  )
);
