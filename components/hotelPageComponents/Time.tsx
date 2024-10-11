import { StyleSheet, Text, View } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalState } from "../context/GlobalStateProvider";

const Time = () => {
  const { hotelInfo } = useGlobalState();
  return (
    <View>
      <Text style={styles.text}>Check in & Check Times</Text>
      <View style={styles.checkInTime}>
        <View style={styles.flex}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text style={styles.checkInTimeText}>Check in from:</Text>
        </View>
        <Text style={{ marginTop: 13 }}>{hotelInfo.hotel.checkin_time}</Text>
      </View>
      <View style={styles.checkInTime}>
        <View style={styles.flex}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text style={styles.checkInTimeText}>Check out from:</Text>
        </View>
        <Text style={{ marginTop: 13 }}>{hotelInfo.hotel.checkout_time}</Text>
      </View>
    </View>
  );
};

export default Time;

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
  checkInTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkInTimeText: {
    marginLeft: 10,
    marginTop: 1,
    color: "#9D9D9D",
  },
});
