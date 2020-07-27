"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var width = react_native_1.Dimensions.get("window").width; //full width
var FooterButton = function (props) {
    var children = props.children, isCancel = props.isCancel, isEdit = props.isEdit, isTwo = props.isTwo, onPress = props.onPress, title = props.title;
    var buttonStyle = [styles.button];
    var textStyle = [styles.buttonText];
    if (isEdit) {
        buttonStyle["minWidth"] = width / 2.5;
    }
    if (isTwo) {
        buttonStyle["minWidth"] = width / 2;
    }
    if (isCancel) {
        buttonStyle["backgroundColor"] = "#ffffff";
        buttonStyle["borderColor"] = "grey";
        textStyle["color"] = "grey";
    }
    if (react_native_1.Platform.OS === "android") {
        var onPress_1 = props.onPress, children_1 = props.children, title_1 = props.title;
        return (<react_native_1.TouchableOpacity style={buttonStyle} onPress={onPress_1}>
        {children_1}
        <react_native_1.Text style={textStyle}>{title_1}</react_native_1.Text>
      </react_native_1.TouchableOpacity>);
    }
    else {
        return (<react_native_1.TouchableOpacity style={buttonStyle} onPress={onPress}>
        {children}
        <react_native_1.Text style={textStyle}>{title}</react_native_1.Text>
      </react_native_1.TouchableOpacity>);
    }
};
var styles = react_native_1.StyleSheet.create({
    buttonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
        paddingHorizontal: 3
    },
    button: {
        paddingVertical: 10,
        backgroundColor: "grey",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        minWidth: width / 3,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    }
});
exports.default = FooterButton;
