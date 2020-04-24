import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TaskItem(props) {
  const { completed, description, id, name, target } = props;

  // these will have touchable features
  const status = completed ? completed : "incomplete";
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>{name}</Text>
        <Image source={require("../assets/delete.png")} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.text}>Description: {description}</Text>
        <Text style={styles.text}>Target: {target}</Text>
        <Text style={styles.text}>Completed: {status}</Text>
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
