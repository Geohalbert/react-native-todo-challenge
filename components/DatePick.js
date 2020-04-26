import React, { useEffect, useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { toTimestring, toTimestamp } from "../utils/functions";

const DatePick = props => {
  const { target, setTarget, newTarget } = props;
  const [date, setDate] = useState(new Date(1588204800000));
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, value) => {
    setShow(Platform.OS === "ios"); // first state update hides datetimepicker
    setDate(value);
    setTarget(value);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    if (isLoading) {
      // setDate(newTarget);
      setIsLoading(false);
    }
  });

  const showDatepicker = () => {
    showMode("date");
  };
  const title = toTimestring(target);
  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title={title} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          // mode="default"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePick;
