import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const VerificationCodeScreen = ({
  mobileNumber,
  verificationCode,
  setVerificationCode,
  handleSubmitCode,
}) => {
  return (
    <View style={styles.loginWrapper}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        Enter the code we sent over SMS to {mobileNumber}
      </Text>
      <View>
        <TextInput
          keyboardType="numeric"
          maxLength={6}
          style={styles.input}
          placeholder=" - - - - - -"
          value={verificationCode}
          onChangeText={(text) => {
            setVerificationCode(text);
          }}
        />
      </View>
      <TouchableOpacity activeOpacity={1} onPress={handleSubmitCode}>
        <Text style={styles.formButton}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationCodeScreen;

const styles = StyleSheet.create({
  loginWrapper: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 30,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 20,
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
