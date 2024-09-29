import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const LoginTypeTextInput = ({ iconName, name, iconColor }) => {
  return (
    <TouchableOpacity style={styles.autoLoginWrapper} activeOpacity={1}>
      <View style={styles.iconWrapper}>
        <AntDesign name={iconName} size={26} color={iconColor} />
      </View>
      <Text style={styles.loginText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default LoginTypeTextInput;

const styles = StyleSheet.create({
  autoLoginWrapper: {
    width: "100%",
    flexDirection: "row",

    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  iconWrapper: {
    width: "30%",
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
