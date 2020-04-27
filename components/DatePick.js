import React from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      date: this.props.date,
      mode: "date",
      show: false
    };
  }

  componentDidMount() {
    if (this.state.loading && this.props.date !== "Invalid Date") {
      this.setState({ loading: false, date: new Date(this.props.date) });
    }
  }
  render() {
    const { setTarget } = this.props;
    const { show, mode, date, loading } = this.state;

    const showDatepicker = () => {
      showMode("date");
    };

    const onChange = (event, selectedValue) => {
      const plat = Platform.OS === "ios";
      if (selectedValue !== undefined) {
        this.setState({
          show: plat,
          date: selectedValue
        });
        setTarget(selectedValue);
      } else {
        this.setState({
          show: false
        });
      }
    };

    const showMode = currentMode => {
      this.setState({ show: true, mode: currentMode });
    };

    const renderButton = (
      <View>
        <Button onPress={showDatepicker} title="Change Date" />
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
