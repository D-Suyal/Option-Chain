// Entry point of the application. Wraps main content in SafeAreaView for status bar safety.
import React from "react";
import { SafeAreaView } from "react-native";
import OptionChainScreen from "./src/screens/optionChainScreen";

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <OptionChainScreen />
  </SafeAreaView>
);

export default App;
