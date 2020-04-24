import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

import { useDispatch } from "react-redux";
import { createTask } from "../actions/task.actions";

import axios from "axios";

export default function NewTask({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [completed, setCompleted] = useState("");

  const setIsFocused = navigation.getParam("setIsFocused");

  const createNewTask = () => {
    let id = Math.floor(Math.random() * Math.floor(10000000));
    let newTask = {
      id,
      name,
      description,
      target,
      completed
    };

    const url =
      "https://my-json-server.typicode.com/geohalbert/todo-server/tasks";

    axios
      .post(url, newTask)
      .then(res => res.data)
      .then(data => {
        dispatch(createTask(data));
        navigation.goBack();
      })
      .catch(error => alert(error.message));
  };

  let disabled = name.length > 0 && description.length > 0 ? false : true;
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        <TextInput
          onChangeText={text => setName(text)}
          placeholder={"Name"}
          autoFocus={true}
          style={[styles.name]}
          value={name}
        />
        <TextInput
          multiline={true}
          onChangeText={text => setDescription(text)}
          placeholder={"Enter description"}
          style={[styles.description]}
          maxLength={250}
          value={description}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableHighlight
            style={[styles.button]}
            disabled={disabled}
            onPress={createNewTask}
            underlayColor="#000000"
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#4d79ff",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    width: 80
  },
  buttonContainer: {
    flexDirection: "row",
    height: 70,
    padding: 12
  },
  buttonText: {
    color: "#ffffff"
  },
  description: {
    borderColor: "#ffffff",
    borderTopWidth: 1,
    color: "#333333",
    fontSize: 30,
    lineHeight: 33,
    minHeight: 170,
    padding: 16,
    paddingTop: 16
  },
  flex: {
    flex: 1
  },
  name: {
    backgroundColor: "#ffffff",
    fontSize: 20,
    height: 70,
    lineHeight: 28,
    padding: 12
  }
});
