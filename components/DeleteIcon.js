import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import axios from "axios";

import { deleteTask } from "../actions/task.actions";

removeTask = async id => {
  axios
    .delete(url, { data: { id: id } })
    .then(res => dispatch(deleteTask(id)))
    .catch(error => {
      console.log(error);
    });
};

deleteTaskAlert = id => {
  Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
    { text: "Delete", onPress: () => this.removeTask(id) },
    {
      text: "Cancel",
      style: "cancel"
    }
  ]);
};
const url = "https://my-json-server.typicode.com/geohalbert/todo-server/tasks";

class DeleteIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 60, right: 40 }}
          onPress={() => deleteTaskAlert(id)}
        >
          <Image style={styles.icon} source={require("../assets/delete.png")} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    height: 15,
    marginRight: 20,
    resizeMode: "contain",
    width: 15
  },
  menuButton: {
    position: "absolute",
    right: 10
  },
  menuOptionsContainer: {
    borderBottomWidth: 0,
    borderColor: "gray",
    borderWidth: 2,
    position: "relative"
  }
});

export default DeleteIcon;
