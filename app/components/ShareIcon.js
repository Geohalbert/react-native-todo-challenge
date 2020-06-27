import React from "react";
import { Image, Share, StyleSheet, TouchableOpacity, View } from "react-native";
import { nativeShare } from "../utils/functions-ts";

class ShareIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { task } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 60, right: 40 }}
          onPress={() => nativeShare(task)}
        >
          <Image
            style={styles.icon}
            source={require("../assets/sharethis-32.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    height: 15,
    marginRight: 20,
    resizeMode: "contain",
    width: 15
  }
});

export default ShareIcon;
