import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FooterButton from "./FooterButton";

const width = Dimensions.get("window").width;
class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2020-02-08T00:00:00.000Z",
      loading: true,
      mode: "date",
      show: true
    };
  }

  componentDidMount() {
    if (this.state.loading && this.props.date !== "Invalid Date") {
      this.setState({
        date: this.props.date,
        loading: false
      });
    }
  }
  render() {
    const { setShow, setTarget } = this.props;
    const { date, loading, show } = this.state;

    onChange = (event, selectedValue) => {
      const plat = Platform.OS === "ios";
      if (selectedValue !== undefined) {
        this.setState({
          date: selectedValue,
          show: plat
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
        loading: true,
        show: false
      });
    };

    const submit = async () => {
      await setDate();
      setShow(false);
    };

    const onCancel = () => {
      setShow(false);
      this.setState({
        loading: true,
        show: false
      });
    };

    const showMode = currentMode => {
      this.setState({
        mode: currentMode,
        show: true
      });
    };
    const renderButton = (
      <View style={styles.buttonContainer}>
        <FooterButton isCancel isTwo onPress={onCancel} title="Cancel" />
        <FooterButton isSubmit isTwo onPress={submit} title="Submit" />
      </View>
    );

    const onClose = () => {
      setTarget(date);
      this.setState({ show: false });
    };

    return (
      <View style={styles.container}>
        {!loading && Platform.OS === "ios" && show && renderButton}
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
                  date: d,
                  show: plat
                });
              } else {
                this.setState({
                  show: false
                });
              }
            }}
            onClose={onClose}
            style={{ backgroundColor: "white" }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    backgroundColor: "grey",
    borderBottomRightRadius: 0,
    borderColor: "#fff",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    minWidth: width / 3.5,
    paddingVertical: 10
  },
  buttonContainer: {
    backgroundColor: Platform.OS !== "ios" ? "#00000066" : "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold"
  },
  container: {
    backgroundColor: Platform.OS === "ios" ? "#00000066" : "transparent",
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%"
  },
  header: {
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "grey",
    justifyContent: "space-between",
    padding: 16,
    width: "100%"
  },
  left: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  middle: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 0
  },
  right: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  }
});

export default DatePick;
