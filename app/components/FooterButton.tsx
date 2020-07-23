import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

const width = Dimensions.get("window").width; //full width
interface FBProps  {
  isCancel: boolean,
  isEdit: boolean,
  isTwo: boolean,
  onPress: () => void,
  title: string
}

const FooterButton: React.FC<FBProps> = props => {
  const {
    children,
    isCancel,
    isEdit,
    isTwo,
    onPress,
    title
  } = props;

  const buttonStyle = [styles.button];
  const textStyle = [styles.buttonText];

  if (isEdit) {
    buttonStyle["minWidth"]= width / 2.5;
  }
  if (isTwo) {
    buttonStyle["minWidth"]= width / 2;
  }
  if (isCancel) {
    buttonStyle["backgroundColor"] = "#ffffff";
    buttonStyle["borderColor"] = "grey";
    textStyle["color"] ="grey";
  }

  if (Platform.OS === "android") {
    const { onPress, children, title} = props;
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
  }
});

export default FooterButton;