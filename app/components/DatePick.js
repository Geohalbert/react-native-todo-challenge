import React from "react";
import {
  Button,
  Dimensions,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FooterButton from "./FooterButton";

const width = Dimensions.get("window").width; //full width
class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      date: "2020-02-08T00:00:00.000Z",
      mode: "date",
      show: true
    };
  }

  componentDidMount() {
    if (this.state.loading && this.props.date !== "Invalid Date") {
      this.setState({
        loading: false,
        date: this.props.date
      });
    }
  }
  render() {
    const { setTarget, isEdit } = this.props;
    const { show, mode, date, loading } = this.state;

    const showDatepicker = () => {
      showMode("date");
    };

    onChange = (event, selectedValue) => {
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

    const setDate = async () => {
      await setTarget(date);
      this.setState({
        // loading: true,
        show: false
      });
    };

    const onCancel = () => {
      this.setState({ show: false });
    };

    const showMode = currentMode => {
      this.setState({ show: true, mode: currentMode });
    };
    const renderButton = (
      <View style={styles.buttonContainer}>
        <FooterButton isCancel onPress={onCancel} title="Cancel" />
        <FooterButton isSubmit onPress={setDate} title="Submit" />
      </View>
    );

    const onClose = () => {
      setTarget(date);
      this.setState({ show: false });
    };
    //   // <TouchableOpacity style={stylesArr} onPress={showDatepicker}>
    //   //   <Text style={styles.buttonText}>Change Date</Text>
    //   // </TouchableOpacity>
    //   // <View style={stylesArr}>
    //   //   <Button onPress={showDatepicker} title="Change Date" />
    //   // </View>
    // );
    return (
      <View style={styles.container}>
        {!loading && renderButton}
        {Platform.OS === "ios" && show && (
          <View style={styles.header}>
            <TouchableOpacity onPress={setDate}>
              <Text>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {show && (
          <DateTimePicker
            date={date}
            value={new Date(date)}
            mode="date"
            display="default"
            onChange={(e, d) => {
              const plat = Platform.OS === "ios";
              if (d !== undefined) {
                this.setState({
                  show: plat,
                  date: d
                });
                // setTarget(d);
              } else {
                this.setState({
                  show: false
                });
              }
            }}
            // onChange={d => {
            //   const plat = Platform.OS === "ios";
            //   if (d !== undefined) {
            //     this.setState({
            //       show: plat,
            //       date: Date(d)
            //     });
            //     // setTarget(d);
            //   } else {
            //     this.setState({
            //       show: false
            //     });
            //   }
            // }}
            onClose={onClose}
            style={{ backgroundColor: "white" }}
          />
        )}

        {/* <DateTimePicker
          value={this.state.date}
          mode="date"
          onClose={d => {
            if (d && Platform.OS !== "ios") {
              setTarget(d);
              this.setState({ show: false, date: d });
            } else {
              this.setState({ show: false });
            }
          }}
          onClose={d => {
            this.setState({ date: d });
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold"
    // paddingHorizontal: 3
  },
  container: {
    backgroundColor: Platform.OS === "ios" ? "#00000066" : "transparent",
    position: "absolute",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%"
  },
  header: {
    width: "100%",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    minWidth: width / 3.5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  middle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 2
  },
  right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  left: { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
});

export default DatePick;
