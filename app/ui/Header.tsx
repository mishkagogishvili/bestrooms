import React from "react";
import { Text, StyleSheet } from "react-native";

const Header = () => {
  return <Text style={styles.headerText}>EHotel.space</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 20,
  },
});

export default Header;
