import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import LoginTypeTextInput from "../LoginTypeTextInput";
import CountryCodePicker from "../CountryCodePicket";

const LoginForm = ({ handleSubmit, mobileNumber, setMobileNumber }) => {
  return (
    <View style={styles.loginWrapper}>
      <View>
        <CountryCodePicker
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
        />
      </View>
      <Text style={{ color: "grey" }}>
        We’ll call or text you to confirm your number. Standard message and data
        rates apply.
      </Text>
      <TouchableOpacity activeOpacity={1} onPress={handleSubmit}>
        <Text style={styles.formButton}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <LoginTypeTextInput
        iconName="facebook-square"
        iconColor="#4267B2"
        name={"continue with facebook"}
      />
      <LoginTypeTextInput
        iconName="google"
        iconColor="#DB4437"
        name={"continue with Google"}
      />
      <LoginTypeTextInput
        iconName="apple1"
        iconColor="black"
        name={"continue with Apple"}
      />
      <LoginTypeTextInput
        iconName="mail"
        iconColor="black"
        name={"continue with Email"}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  loginWrapper: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 30,
  },

  or: {
    margin: "auto",
    marginVertical: 20,
  },

  formButton: {
    width: "100%",
    margin: "auto",
    color: "white",
    backgroundColor: "#1d2123",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 15,
    marginTop: 25,
    textAlign: "center",
    borderRadius: 4,
  },
});
