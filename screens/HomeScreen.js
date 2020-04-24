import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import axios from "axios";
import { getTasks } from "../actions/task.actions";

import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const dataReducer = useSelector(state => state.dataReducer);
  const { tasks } = dataReducer;
  const url =
    "https://my-json-server.typicode.com/geohalbert/todo-server/tasks";

  // gather tasks
  const fetchTasks = () => {
    setIsLoading(true);
    axios
      .get(url)
      .then(res => dispatch(getTasks(res.data)))
      .catch(error => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // renders tasks
  renderTasks = data => {
    return data.map((task, key) => {
      return (
        <View style={styles.task} key={key}>
          <TaskItem
            completed={task.completed}
            description={task.description}
            id={task.id}
            name={task.name}
            target={task.target}
          />
        </View>
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
        <TouchableHighlight
          style={styles.compose}
          underlayColor="#ff7043"
          onPress={() =>
            navigation.navigate("CreateTask", { title: "New Task" })
          }
        >
          <Text style={{ fontSize: 25, color: "white", fontSize: 14 }}>
            Create
          </Text>
        </TouchableHighlight>
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
