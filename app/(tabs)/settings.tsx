import React from "react";

import { StyleSheet, Text, View } from "react-native";
import SelectLanguage from "../ui/SelectLanguage";
import ChangeCurrency from "../ui/ChangeCurrency";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "@ant-design/react-native";
const settings = () => {
  return (
    <GestureHandlerRootView>
      <Provider>
        <View style={styles.container}>
          <Text style={styles.settingsHeader}>Settings</Text>
          <SelectLanguage />
          <ChangeCurrency />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  settingsHeader: {
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
});
