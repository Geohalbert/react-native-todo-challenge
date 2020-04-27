import { Linking, Share } from "react-native";
import { Platform } from "@unimodules/core";
import excludeActivity from "./constants";

export const toTimestamp = strDate => {
  return Date.parse(strDate);
};
export const toTimestring = timestamp => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatDate = str => {
  const newNum = toTimestamp(str);
  return new Date(newNum);
};

export async function urlTest(url) {
  await Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error("An error occurred", err));
}

export async function nativeShare(task) {
  if (Platform.OS === "ios") {
    Share.share(
      {
        message: `Your task '${task.name}' is as follows: ${task.description}`,
        title: "Your task details"
      },
      {
        excludedActivityTypes: excludeActivity,
        subject: "Your task details"
      }
    )
      .then(res => console.log(res))
      .catch(error => console.log(error));
  } else {
    Share.share(
      {
        message: `Your task '${task.name}' is as follows: ${task.description}`,
        title: "Your task details"
      },
      {
        dialogTitle: "Your task details"
      }
    )
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }
}
