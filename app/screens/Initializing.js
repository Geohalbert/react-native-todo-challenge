"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var expo_1 = require("expo");
var db_json_1 = __importDefault(require("../utils/db.json"));
// this "screen" basically loads the data and then navigates to the app
var Initializing = function (props) {
    var navigation = props.navigation;
    react_1.useEffect(function () { return checkLocalData(); }, []);
    function checkLocalData() {
        react_native_1.AsyncStorage.getItem("tasks", function (err, data) {
            if (data === null) {
                react_native_1.AsyncStorage.setItem("tasks", JSON.stringify(db_json_1.default.tasks));
                navigation.navigate("App");
            }
            else {
                navigation.navigate("App");
            }
        });
    }
    return <expo_1.AppLoading />;
};
exports.default = Initializing;
