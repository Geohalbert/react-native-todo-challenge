import React, { useState, useEffect } from "react";
import {
  Alert,
  AsyncStorage,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { CheckBox } from "react-native-elements";

import { useDispatch } from "react-redux";
import { createTask, updateTask, deleteTask } from "../actions/task.actions";

import DatePick from "../components/DatePick";

import axios from "axios";

export default function SaveTaskScreen({ navigation }) {
  const dispatch = useDispatch();

  //const setIsFocused = navigation.getParam("setIsFocused");
  //shouldTriggerParent = setIsFocused;

  const isEditMode = navigation.getParam("isEditMode", null);
  const task = navigation.getParam("task", null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [id, setId] = useState("");
  const [completed, setCompleted] = useState(task.completed || false);

  setTaskData = task => {
    setId(task.id);
    setName(task.name);
    setDescription(task.description);
    setTarget(task.target);
    setCompleted(task.completed);
  };

  save = () => {
    setIsLoading(true);
    const newId = Math.floor(Math.random() * Math.floor(10000000));

    let taskObj = {
      id: isEditMode ? id : newId,
      name: name,
      description: description,
      target: target,
      completed: completed
    };

    const saveAction = isEditMode ? "modification" : "creation";
    const successMessage = isEditMode
      ? "Task has been updated"
      : "Task has been created";

    AsyncStorage.getItem("tasks", (err, tasks) => {
      if (err) alert(err.message);
      else if (tasks !== null) {
        tasks = JSON.parse(tasks);

        if (!isEditMode) {
          tasks.push(taskObj);
        } else {
          ///if the task is in the array, replace the task by index
          const index = tasks.findIndex(obj => obj.id === taskObj.id);
          if (index !== -1) tasks[index] = taskObj;
        }

        //Update the local storage
        AsyncStorage.setItem("tasks", JSON.stringify(tasks), () => {
          if (!isEditMode) dispatch(createTask(taskObj));
          else dispatch(updateTask(taskObj));
          navigation.navigate("Home", {
            successMessage
          });
        });
      }
    });
  };

  removeTask = id => {
    AsyncStorage.getItem("tasks", (err, tasks) => {
      if (err) alert(err.message);
      else if (tasks !== null) {
        tasks = JSON.parse(tasks);

        //find the index of the task with the id passed
        const index = tasks.findIndex(obj => obj.id === id);

        // remove the task
        if (index !== -1) tasks.splice(index, 1);

        //Update the local storage
        AsyncStorage.setItem("tasks", JSON.stringify(tasks), () => {
          dispatch(deleteTask(id));
          navigation.navigate("Home", {
            successMessage: "Task has been deleted"
          });
        });
      }
    });
  };

  deleteTaskAlert = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Delete", onPress: () => removeTask(id) },
      {
        text: "Cancel",
        style: "cancel"
      }
    ]);
  };
  useEffect(() => {
    // if isEditMode, prepopulate task data
    if (isEditMode && task) {
      setTaskData(task);
    }
  }, []);

  const disabled = name && description && !isLoading ? false : true;
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        <CheckBox
          center
          iconRight
          title="Completed"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={completed}
          onPress={() => setCompleted(!completed)}
        />
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
        <View style={styles.date}>
          <Text>Target: </Text>
          <DatePick date={target} onChange={setTarget} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableHighlight
            style={[styles.button]}
            disabled={disabled}
            onPress={() => save()}
            underlayColor="#000000"
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

SaveTaskScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("isEditMode")
    ? "Edit Task"
    : "Create Task",
  headerRight: () => (
    <TouchableOpacity
      hitSlop={{ top: 30, bottom: 30, left: 60, right: 40 }}
      onPress={() => deleteTaskAlert()}
      style={styles.icon}
    >
      <Image source={require("../assets/delete.png")} />
    </TouchableOpacity>
  ),
  headerTitleStyle: {
    textAlign: "center",
    flexGrow: 1,
    alignSelf: "center"
  },
  headerStyle: {
    paddingHorizontal: 8
  }
});

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
  date: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 10
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
