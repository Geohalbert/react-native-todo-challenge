import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchBar(props) {
  const { onChangeText, value } = props;

  const [isFocused, onChangeFocus] = React.useState(false);

  let stylesArr = [styles.input];

  if (isFocused) {
    stylesArr.push(styles.focused);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={stylesArr}
        onChangeText={text => onChangeText(text)}
        onFocus={() => onChangeFocus(true)}
        onBlur={() => onChangeFocus(false)}
        value={value}
        placeholder={"Search Tasks (by name)"}
      />
      <Image style={styles.icon} source={require("../assets/mag-lens.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#f2f2f2",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 40,
    marginBottom: 2.5,
    backgroundColor: "white"
  },
  focused: {
    borderColor: "grey"
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    position: "absolute",
    top: 8,
    left: 7
  }
});
