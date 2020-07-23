import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { toTimestring } from "../utils/functions";
import ShareIcon from "./ShareIcon";

export default function TaskItem(props) {
  const { completed, completedAt, description, id, name, target, task } = props;
  // these will have touchable features
  const status = completed
    ? `completed on ${toTimestring(completedAt)}`
    : "incomplete";
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>{name}</Text>
        <ShareIcon task={task} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.text}>Description: {description}</Text>
        <Text style={styles.text}>Target: {toTimestring(target)}</Text>
        <Text style={styles.text}>Status: {status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
    width: "100%"
  },
  cardBody: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    height: "auto"
  },
  headerText: {
    color: "white",
    fontWeight: "bold"
  },
  cardHeader: {
    padding: 10,
    backgroundColor: "#555555",
    justifyContent: "space-between",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#555555",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    flexShrink: 1
  }
});
