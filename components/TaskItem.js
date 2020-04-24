import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TaskItem(props) {
  const { completed, description, id, name, target } = props;

  // these will have touchable features
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text>{description}</Text>
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
    flexDirection: "row",
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
    justifyContent: "center",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#555555",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center"
  }
});
