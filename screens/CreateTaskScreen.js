import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../actions/task.actions";

import axios from "axios";

export default function CreateNewTask({ navigation }) {
  const dispatch = useDispatch();

  const setIsFocused = navigation.getParam("setIsFocused");
  const isEditMode = navigation.getParam("isEditMode");

  shouldTriggerParent = setIsFocused;

  let task = navigation.getParam("task", null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [id, setId] = useState("");
  const [completed, setCompleted] = useState("");

  // fetchTaskData = async () => {
  //   const taskId = await navigation.getParam("taskId");
  //   setId(taskId);

  //   axios
  //     .get(url, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     .then(res => {
  //       const task = res.data;
  //       setName(task.name);
  //       setDescription(task.description);
  //       setTarget(task.target);
  //       setCompleted(task.completed);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // saveTask = () => {
  //   setIsLoading(true);
  //   let task_ = {};
  //   let isEdit = task !== null;
  //   const newId = Math.floor(Math.random() * Math.floor(10000000));

  //   if (isEdit) {
  //     task_ = task;
  //   } else {
  //     task_ = {
  //       id: newId,
  //       name: name,
  //       description: description,
  //       target: target,
  //       completed: completed
  //     };
  //   }
  //   const saveAction = isEditMode ? "modification" : "creation";
  //   const successMessage = isEditMode
  //     ? "Task has been updated"
  //     : "Task has been created";

  //   const axiosCall = isEditMode
  //     ? axios
  //         .put(`${url}${task_.id}`, task_, {
  //           headers: { "Content-Type": "application/json" }
  //         })
  //         .then(res => {
  //           dispatch(updateTask(res.data));
  //         })
  //     : axios
  //         .post(url, task_, {
  //           headers: { "Content-Type": "application/json" }
  //         })
  //         .then(res => {
  //           dispatch(createTask(res.data));
  //         });

  //   axiosCall
  //     .then(res => {
  //       console.log(
  //         `typeof shouldTriggerParent: ${typeof shouldTriggerParent}`
  //       );
  //       isEditMode
  //         ? // task edit successful, route to task
  //           navigation.goBack() // task creation successful, route to home
  //         : navigation.navigate("Home", {
  //             reloadTasks: true,
  //             successMessage: successMessage
  //           });

  //       if (typeof setIsFocused === "function") {
  //         setIsFocused(true);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   // if isEditMode, prepopulate task info
  //   if (isEditMode && task) {
  //     fetchTaskData(task);
  //   }
  // }, []);

  let disabled = name && description && !isLoading ? false : true;
  return (
    <SafeAreaView style={styles.flex}>
      <Text>Test</Text>
      {/* <View style={styles.flex}>
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
            onPress={() => saveTask()}
            underlayColor="#000000"
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View> */}
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
