import { Linking, Share } from "react-native";
import { Platform } from "@unimodules/core";

export const toTimestamp = (strDate: string) => {
  return Date.parse(strDate);
};
export const toTimestring = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatDate = (str: string) => {
  const newNum = toTimestamp(str);
  return new Date(newNum);
};

export async function urlTest(url: string) {
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

type Task = {
  name: string,
  description: string
}

export async function nativeShare(task: Task) {
  if (Platform.OS === "ios") {
    Share.share(
      {
        message: `Your task '${task.name}' is as follows: ${task["description"]}`,
        title: "Your task details"
      },
      {
        excludedActivityTypes: [
          "com.apple.UIKit.activity.MarkupAsPDF",
          "com.apple.UIKit.activity.AddToReadingList",
          "com.apple.UIKit.activity.AirDrop",
          "com.apple.UIKit.activity.AssignToContact",
          "com.apple.UIKit.activity.CopyToPasteboard",
          "com.apple.UIKit.activity.OpenInIBooks",
          "com.apple.UIKit.activity.PostToFacebook",
          "com.apple.UIKit.activity.PostToFlickr",
          "com.apple.UIKit.activity.PostToTencentWeibo",
          "com.apple.UIKit.activity.PostToTwitter",
          "com.apple.UIKit.activity.PostToVimeo",
          "com.apple.UIKit.activity.PostToWeibo",
          "com.apple.UIKit.activity.Print",
          "com.apple.UIKit.activity.SaveToCameraRoll"
        ],
        subject: "Your task details"
      }
    )
      .then(res => console.log(res))
      .catch(error => console.log(error));
  } else {
    Share.share(
      {
        message: `Your task '${task["name"]}' is as follows: ${task["description"]}`,
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
