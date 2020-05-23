import React from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";

const width = Dimensions.get("window").width; //full width

export default function FooterButton(props) {
  const {
    title,
    onPress,
    isEdit,
    isCancel,
    isTwo,
    style,
    iconName,
    children,
    position,
    ...rest
  } = props;

  const buttonStyle = [styles.button];
  const textStyle = [styles.buttonText];
  const divider = isEdit ? 3 : 2.5;

  if (isEdit) {
    buttonStyle.push(styles.expanded);
  }
  if (isTwo) {
    buttonStyle.push(styles.isTwo);
  }
  if (isCancel) {
    buttonStyle.push(styles.secondary);
    textStyle.push(styles.secondaryText);
  } else {
    buttonStyle.push(styles.shorted);
  }

  if (Platform.OS === "android") {
    const { onPress, iconName, children, title, ...rest } = props;
    return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        {children}
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        {children}

        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 3
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    minWidth: width / 3,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  secondaryText: {
    color: "grey"
  },
  secondary: {
    backgroundColor: "#ffffff",
    borderColor: "grey"
  },
  expanded: {
    minWidth: width / 2.5
  },
  shortened: {
    minWidth: width / 3
  },
  middle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  left: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  isTwo: {
    minWidth: width / 2
  }
});
