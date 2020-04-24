import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import TaskItem from "../components/TaskItem";

export default function ViewTaskScreen({ navigation }) {
  const [task, setTask] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [completed, setCompleted] = useState("");
  const [isFocused, setIsFocused] = useState(true);

  //   shouldTriggerParent = setIsFocused;

  const id = navigation.getParam("id");

  const url =
    "https://my-json-server.typicode.com/geohalbert/todo-server/tasks";
  fetchTaskData = id => {
    axios
      .get(url + `/${id}/`)
      .then(res => {
        const task = res.data;
        setTask(task);
        setName(task.name);
        setDescription(task.description);
        setTarget(task.target);
        setCompleted(task.completed);
      })
      .catch(err => {
        console.log("err", err);
        setCustomerError(true);
      });
  };

  useEffect(() => {
    this.fetchTaskData(navigation.getParam("id"));
  }, []);

  renderTaskCard = () => {
    return (
      <TaskItem
        completed={completed}
        description={description}
        id={id}
        name={name}
        target={target}
      />
    );
  };

  return <View style={styles.container}>{task && renderTaskCard()}</View>;
}

ViewTaskScreen.navigationOptions = screenProps => ({
  title: <Text>View Task</Text>,
  headerRight: <Text>EDIT</Text>
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
