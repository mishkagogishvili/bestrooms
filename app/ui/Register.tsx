import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button, Flex, List, Radio, WingBlank } from "@ant-design/react-native";
import { useNavigation, useRouter } from "expo-router";

const Register = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>REGISTER ACCOUNT</Text>
      <View>
        <TextInput style={styles.input} placeholder="Email" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="User Name" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="Password" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="Confirm Password" />
      </View>
      <List style={{ backgroundColor: "transparent" }}>
        <List.Item
          style={{ backgroundColor: "transparent" }}
          thumb={<Radio>I accept Terms and Conditions</Radio>}
        />
      </List>
      <TouchableOpacity activeOpacity={1}>
        <Text style={styles.formButton}>REGISTER</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
      <TouchableOpacity
        style={styles.login}
        onPress={handleBackPress}
        activeOpacity={1}
      >
        <Text style={{ color: "#1778F2", fontSize: 16 }}>
          I already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  container: {
    width: "80%",
    marginHorizontal: "auto",
  },
  registerText: {
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 20,
  },
  radio: {
    color: "#0000FF",
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
    fontWeight: "bold",
    fontSize: 16,
  },
  login: {
    marginTop: 20,
    marginHorizontal: "auto",
  },
});
