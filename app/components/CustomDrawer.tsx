import React from "react";
import {
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { DrawerItems } from "react-navigation-drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

import { github, linkedIn, resume } from "../utils/constants";
import { urlTest } from "../utils/functions";

const CustomDrawer:React.FC = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{
          height: 240,
          alignItems: "center",
          justifyContent: "center"
        }}
        source={require("../assets/your-logo.png")}
      ></ImageBackground>
      <ScrollView>
        <DrawerItems {...props} />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => urlTest(github)}>
            <Text style={styles.label}>Github</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => urlTest(linkedIn)}>
            <Text style={styles.label}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 10
  },
  label: {
    marginBottom: 30,
    marginLeft: 17,
    fontWeight: "bold"
  }
});

export default CustomDrawer;