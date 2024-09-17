import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

const ActiveBookingHeader = () => {
  const { activeBtn, setActiveBtn, activeButton } = useGlobalState();
  return (
    <View style={styles.container}>
      <View style={styles.activeBookingsWrapper}>
        <TouchableOpacity
          onPress={() => activeButton("1")}
          style={
            activeBtn === "1"
              ? styles.activeBookingsBtnActive
              : styles.activeBookingsBtn
          }
        >
          <Text
            style={
              activeBtn === "1"
                ? styles.activeBookingsBtnActiveText
                : styles.activeBookingsBtnText
            }
          >
            Active Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => activeButton("2")}
          style={
            activeBtn === "2"
              ? styles.activeBookingsBtnActive
              : styles.activeBookingsBtn
          }
        >
          <Text
            style={
              activeBtn === "2"
                ? styles.activeBookingsBtnActiveText
                : styles.activeBookingsBtnText
            }
          >
            Past Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActiveBookingHeader;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 60,
  },
  activeBookingsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 25,
    borderRadius: 8,
    height: 44,
    backgroundColor: "#f5f5f5",
  },
  activeBookingsBtnActive: {
    width: 144,
    height: 36,
    borderRadius: 3,
    backgroundColor: "#212628",

    marginTop: 5,
    cursor: "pointer",
  },
  activeBookingsBtnActiveText: {
    color: "white",
    margin: "auto",
  },
  activeBookingsBtn: {
    width: 144,
    height: 36,
    borderRadius: 3,
    backgroundColor: "transparent",

    marginTop: 5,
    cursor: "pointer",
  },
  activeBookingsBtnText: {
    color: "#434343",
    margin: "auto",
  },
});
