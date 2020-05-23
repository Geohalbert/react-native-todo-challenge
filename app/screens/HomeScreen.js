import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Button,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { getTasks } from "../redux/actions/task.actions";

import { DrawerActions } from "react-navigation-drawer";

import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataReducer = useSelector(state => state.dataReducer);
  const { tasks } = dataReducer;
  // hooks
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  fetchTasks = () => {
    setIsLoading(true);
    AsyncStorage.getItem("tasks", (err, tasks) => {
      if (err) console.log(err);
      else if (tasks !== null) dispatch(getTasks(JSON.parse(tasks)));
      setIsLoading(false);
    });
  };

  renderTasks = data => {
    return data.map((task, key) => {
      return (
        <TouchableOpacity
          style={styles.task}
          key={key}
          onPress={() =>
            navigation.navigate("SaveTask", {
              fromHome: true,
              task,
              isEditMode: true
            })
          }
        >
          <TaskItem
            task={task}
            completed={task.completed}
            completedAt={task.completedAt}
            description={task.description}
            id={task.id}
            name={task.name}
            target={task.target}
          />
        </TouchableOpacity>
      );
    });
  };

  // eventually this will involve more than populating the list
  // searching/sorting
  renderList = data => {
    return <ScrollView>{renderTasks(data)}</ScrollView>;
  };

  const footer = (
    <View style={styles.footer}>
      <Button
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        // onPress={() => {
        //   navigation.navigate("WaterTest", {
        //     customerId: navigation.getParam("customerId"),
        //     setIsFocused: setIsFocused
        //   });
        //   setIsFocused(false);
        // }}
      >
        {/* <Image
          style={styles.icon}
          source={require("../assets/test-icon.png")}
        /> */}
        <Text style={styles.buttonText}>Test</Text>
      </Button>
      <Button
        // onPress={() => {
        //   navigation.navigate("AddPhotoModal", {
        //     customerId: navigation.getParam("customerId"),
        //     setIsFocused: setIsFocused
        //   });
        //   setIsFocused(false);
        // }}
        style={{ borderRadius: 0, marginHorizontal: 2 }}
      >
        {/* <Image
          style={styles.icon}
          source={require("../assets/photo-icon.png")}
        /> */}
        <Text style={styles.buttonText}>Photo</Text>
      </Button>
      <Button
        // onPress={() => {
        //   navigation.navigate("AddNoteModal", {
        //     customerId: navigation.getParam("customerId"),
        //     setIsFocused: setIsFocused
        //   });
        //   setIsFocused(false);
        // }}
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        {/* <Image
          style={styles.icon}
          source={require("../assets/note-icon.png")}
        /> */}
        <Text style={styles.buttonText}>Note</Text>
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading && showLoading()} */}
      {tasks && renderList(tasks)}
      {!isLoading && (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate("SaveTask");
          }}
          underlayColor="#000000"
        >
          <Text style={styles.buttonText}>Create new task</Text>
        </TouchableHighlight>
      )}
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = screenProps => ({
  headerRight: () => <View style={{ padding: 6 }}></View>,
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        screenProps.navigation.dispatch(DrawerActions.openDrawer());
        Keyboard.dismiss();
      }}
      style={styles.headerButton}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          resizeMode: "contain",
          marginLeft: 10
        }}
        source={require("../assets/menu_2.png")}
      />
    </TouchableOpacity>
  )
});
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#4d79ff",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    width: "50%"
  },
  buttonText: {
    color: "#ffffff"
  },
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 5
  },
  compose: {
    backgroundColor: "#6B9EFA",
    borderColor: "#6B9EFA",
    fontSize: 8,
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 60,
    right: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20
  },
  text: {
    paddingHorizontal: 5
  }
});
