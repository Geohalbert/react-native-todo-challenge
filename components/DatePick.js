import React from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      date: this.props.target,
      mode: "date",
      show: false
    };
  }

  componentDidMount() {
    if (this.state.loading && this.props.target !== "Invalid Date") {
      this.setState({ loading: false, date: new Date(this.props.target) });
    }
  }
  render() {
    const { target, setTarget, title } = this.props;
    const { show, mode, date, loading } = this.state;

    const showDatepicker = () => {
      showMode("date");
    };

    const onChange = (event, selectedValue) => {
      const plat = Platform.OS === "ios";
      this.setState({
        show: plat,
        date: selectedValue
      });
      setTarget(selectedValue);
    };

    const showMode = currentMode => {
      this.setState({ show: true, mode: currentMode });
    };

    const renderButton = (
      <View>
        <Button onPress={showDatepicker} title={title} />
      </View>
    );
    return (
      <View>
        {!loading && renderButton}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
  }
}

export default DatePick;
