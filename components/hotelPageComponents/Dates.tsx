import { StyleSheet, Text, View } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalState } from "../context/GlobalStateProvider";

const Dates = () => {
  const { search } = useGlobalState();
  return (
    <View>
      <Text style={styles.text}>Check in & Check out dates</Text>
      <View style={styles.flex}>
        <AntDesign name="calendar" size={24} color="black" />
        <Text style={styles.checkInDateText}>
          {search[0].check_in} - {search[0].check_out}
        </Text>
      </View>
    </View>
  );
};

export default Dates;

const styles = StyleSheet.create({
  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },
  flex: {
    flexDirection: "row",
    marginVertical: 15,
  },
  checkInDateText: {
    marginLeft: 10,
    marginTop: 2,
  },
});
