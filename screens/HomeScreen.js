import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import axios from "axios";

import TaskItem from "../components/TaskItem";

export default function HomeScreen(props) {
  const [tasks, setTasks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // gather tasks
  const fetchTasks = () => {
    setIsLoading(true);

    let url =
      "https://my-json-server.typicode.com/geohalbert/todo-server/tasks";
    axios
      .get(url)
      .then(res => JSON.stringify(res.data))
      .then(data => setTasks(data))
      .catch(error => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  // temporary for testing api
  const TestAPI = () => {
    fetchTasks();
  };

  // rendering logic
  if (isLoading) {
    return (
      <View>
        <Text>LOADING....</Text>
      </View>
    );
  } else {
    return (
      <View>
        <View>
          {tasks ? <Text>{tasks}</Text> : <Text>No Tasks received</Text>}
        </View>
        <Button title="TEST API" onPress={TestAPI} />
      </View>
    );
  }
}
