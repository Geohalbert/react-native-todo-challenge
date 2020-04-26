import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { getTasks } from "../actions/task.actions";

import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  // CODE I WAS WORKING ON - MAY NEED LATER
  // const [focusState, setFocusState] = useState(true);

  // useEffect(() => {
  //   this.focusListener = navigation.addListener("didFocus", () => {
  //     setFocusState(true);
  //   });
  //   this.blurListener = navigation.addListener("didBlur", () => {
  //     setFocusState(false);
  //   });
  //   return () => {
  //     this.focusListener.remove();
  //     this.blurListener.remove();
  //   };
  // });

  const dispatch = useDispatch();
  const dataReducer = useSelector(state => state.dataReducer);
  const { tasks } = dataReducer;

  const fetchTasks = () => {
    setIsLoading(true);
    AsyncStorage.getItem("tasks", (err, tasks) => {
      if (err) console.log(err);
      else if (tasks !== null) dispatch(getTasks(JSON.parse(tasks)));

      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  renderTasks = data => {
    return data.map((task, key) => {
      return (
        <TouchableOpacity
          style={styles.task}
          key={key}
          onPress={() =>
            navigation.navigate("SaveTask", {
              task,
              isEditMode: true
            })
          }
        >
          <TaskItem
            completed={task.completed}
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

  // animate later
  showLoading = () => {
    return (
      <View style={styles.task}>
        <Text style={styles.text}>Please wait while data loads</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && showLoading()}
      {tasks && renderList(tasks)}
      {!isLoading && (
        <Button
          title="Add New"
          iconName={"add-icon"}
          onPress={() => {
            navigation.navigate("SaveTask");
          }}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
