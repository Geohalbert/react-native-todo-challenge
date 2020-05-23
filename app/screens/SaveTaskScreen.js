import React, { useState, useEffect } from "react";
import {
  Alert,
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Keyboard
} from "react-native";
import { CheckBox } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";
import { toTimestring, toTimestamp, formatDate } from "../utils/functions";
import { useDispatch } from "react-redux";
import {
  createTask,
  updateTask,
  deleteTask
} from "../redux/actions/task.actions";
import DatePick from "../components/DatePick";
import FooterButton from "../components/FooterButton";

var width = Dimensions.get("window").width; //full width
export default function SaveTaskScreen({ navigation }) {
  const dispatch = useDispatch();
  // nav params
  const isEditMode = navigation.getParam("isEditMode", null);
  const task = navigation.getParam("task", null);
  // misc consts
  const defaultDate = task ? task.target : new Date();
  const disabled = name && description && !isSaving ? false : true;

  const comText = completed ? "Mark incomplete" : "Mark complete";
  // hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState(defaultDate);
  const [id, setId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [completedAt, setCompletedAt] = useState();
  const [show, setShow] = useState(false);

  const stylesArr = [styles.button];

  // if (position === "right") {
  //   stylesArr.push(styles.right);
  // } else if (position === "left") {
  //   stylesArr.push(styles.left);
  // } else if (position === "middle") {
  //   stylesArr.push(styles.left);
  //   stylesArr.push(styles.right);
  // }
  // useEffect(() => {
  //   // if isEditMode, prepopulate task data
  //   loadScreen = () => {
  //     if (isLoading) {
  //       isEditMode && task ? populateData() : setIsLoading(false);
  //     }
  //   };
  // }, [navigation]);

  useEffect(() => {
    // if isEditMode, prepopulate task data
    isEditMode && task ? setTaskData(task) : setIsLoading(false);
  }, []);

  setTaskData = task => {
    setId(task.id);
    setName(task.name);
    setDescription(task.description);
    setTarget(task.target);
    setCompleted(task.completed);
    setCompletedAt(task.completedAt);
  };

  populateData = async task => {
    await setTaskData(task);
    setIsLoading(false);
  };

  displayTarget = target => {
    console.log(`target: ${target}`);
    const test = toTimestring(target);
    console.log(`toTimestring: ${test}`);
    return (
      <View style={styles.date}>
        <Text>Target: {test}</Text>
      </View>
    );
  };

  // events
  save = () => {
    setIsSaving(true);
    const newId = Math.floor(Math.random() * Math.floor(10000000));

    let taskObj = {
      id: isEditMode ? id : newId,
      name: name,
      description: description,
      target: new Date(target),
      completed: completed,
      completedAt: completedAt
    };

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
          //if the task is in the array, replace the task by index
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

  completeTask = completed => {
    if (!completed) {
      setCompletedAt(toTimestamp(new Date()));
      setCompleted(true);
    } else {
      completeTaskAlert();
    }
  };

  // alerts for corresponding events
  deleteTaskAlert = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Delete", onPress: () => removeTask(id) },
      {
        text: "Cancel",
        style: "cancel"
      }
    ]);
  };

  completeTaskAlert = () => {
    Alert.alert(
      "Complete Task",
      "Are you sure you want to make this task incomplete?",
      [
        {
          text: "Mark incomplete",
          onPress: () => {
            setCompletedAt();
            setCompleted(false);
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const footer = (
    <View style={styles.footer}>
      {isEditMode && (
        <FooterButton
          onPress={() => completeTask(completed)}
          position="middle"
          title={comText}
          isEdit={isEditMode}
        />
      )}
      <FooterButton
        onPress={save}
        isEdit={isEditMode}
        position="right"
        title="Save"
      />
    </View>
  );

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
        {!isLoading && displayTarget(target)}

        <Button onPress={() => setShow(!show)} title="show picker" />
        {show && (
          <DatePick setTarget={setTarget} date={target} setShow={setShow} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, alignItems: "center" }}></View>
        {isEditMode && (
          <CheckBox
            center
            iconRight
            iconType="material"
            checkedIcon="clear"
            uncheckedIcon="add"
            checkedColor="green"
            title={comText}
            // checkedIcon="dot-circle-o"
            // uncheckedIcon="circle-o"
            checked={completed}
            onPress={() => completeTask(completed)}
          />
        )}
      </View>

      {!isLoading && footer}
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
  headerLeft: () =>
    screenProps.navigation.getParam("fromHome") !== undefined ? (
      <TouchableOpacity
        onPress={() => screenProps.navigation.navigate("Home")}
        style={styles.headerButton}
      >
        <Text style={styles.headerLeftText}>BACK</Text>
      </TouchableOpacity>
    ) : (
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
    height: 44,
    justifyContent: "center",
    width: 80
  },
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    height: 70,
    padding: 12
  },
  headerButton: {
    paddingRight: 15,
    alignItems: "center",
    flexDirection: "row"
  },
  date: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 20
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 2
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
  },
  headerLeftText: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 15
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    // paddingBottom: 40,
    backgroundColor: "white",

    justifyContent: "space-between",
    width: "100%",
    justifyContent: "center",
    borderTopColor: "grey",
    borderTopWidth: 2
  }
});
