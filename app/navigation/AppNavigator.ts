import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Initializing from "../screens/Initializing";
import HomeScreen from "../screens/HomeScreen";
import SaveTaskScreen from "../screens/SaveTaskScreen";

import CustomDrawer from "../components/CustomDrawer";

// default style
const defaultStyle = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#666666"
  }
};

// initial app stack
const AppStack = createStackNavigator(
  {
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
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center"
    }
  }
);

// drawer for hamburger menu
const NewTaskDrawer = createStackNavigator({
  NewTask: {
    screen: SaveTaskScreen,
    navigationOptions: {
      title: "New Task",
      ...defaultStyle
    }
  }
});

// hamburger menu navigation
const DrawerNavigation = createDrawerNavigator(
  {
    HomeDrawer: {
      screen: AppStack,
      navigationOptions: {
        drawerLabel: "Tasks"
      }
    },
    NewTaskDrawer: {
      screen: NewTaskDrawer,
      navigationOptions: {
        drawerLabel: "New Task",
        ...defaultStyle
      }
    }
  },
  {
    contentComponent: CustomDrawer
  }
);

// app navigation logic
export default createAppContainer(
  createSwitchNavigator(
    {
      Init: Initializing,
      App: DrawerNavigation
    },
    {
      initialRouteName: "Init"
    }
  )
);
