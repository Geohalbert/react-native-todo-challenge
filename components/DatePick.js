import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  TouchableHighlight,
  Text,
  StyleSheet
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePick(props) {
  const { target, onChange } = props;
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View>
        <TouchableHighlight
          style={[styles.button]}
          onPress={showDatepicker}
          underlayColor="#000000"
        >
          <Text style={styles.buttonText}>{target}</Text>
        </TouchableHighlight>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={changeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: 80
  },
  buttonText: { color: "black" },
  buttonContainer: {
    flexDirection: "row",
    height: 70,
    padding: 12
  },
  icon: {
    marginRight: 10
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
