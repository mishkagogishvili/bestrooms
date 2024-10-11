import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Header = () => {
  const router = useRouter();
  const navigateToLogin = () => {
    router.push(`/ui/Login`);
  };
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>EHotel.space</Text>
      <View>
        <TouchableOpacity onPress={navigateToLogin} activeOpacity={1}>
          <Text style={styles.loginText}>Login/Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 20,
  },
  headerWrapper: {
    width: "80%",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginText: {
    marginTop: 55,
  },
});

export default Header;
