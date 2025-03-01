import { AppRegistry } from "react-native";
import App from "./App"; // Caminho correto para o componente principal
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);