import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import AntDesign from "@expo/vector-icons/AntDesign";

const bookingDetails = () => {
  const { db } = useGlobalState();

  const { id } = useGlobalSearchParams();

  const item = db.find((item) => item.id === parseInt(id, 10));

  const navigation = useNavigation();
  if (!item) {
    return <Text>Booking not found</Text>;
  }

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.bookingDetailesHeader}>
            <View style={styles.searchPageBackBtn}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={26} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingDetailesHeaderName}>{item.name}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.bookingStatusWrapper}>
            <Text style={styles.bookingStatusName}>Booking Status</Text>
            <Text>{item.booked === true ? "active" : "inactive"}</Text>
          </View>
          <View style={styles.activityScheduleWrapper}>
            <Text>Activity schedule</Text>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>Departure</Text>
              </View>
              <Text>{item.departure}</Text>
            </View>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>Return</Text>
              </View>
              <Text>{item.return}</Text>
            </View>
          </View>
          <View style={styles.activityScheduleWrapper}>
            <Text>Premium Services</Text>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>
                  Breakfast and dinner
                </Text>
              </View>
              <Text>200.00 Gel</Text>
            </View>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>
                  Breakfast and dinner
                </Text>
              </View>
              <Text>200.00 Gel</Text>
            </View>
          </View>
          <View style={styles.activityScheduleWrapper}>
            <Text>Payment</Text>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>Room Total</Text>
              </View>
              <Text>200.00 Gel</Text>
            </View>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>
                  Premium Service Total
                </Text>
              </View>
              <Text>200.00 Gel</Text>
            </View>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityScheduleName}>Grand Total</Text>
              </View>
              <Text>200.00 Gel</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default bookingDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
  },
  container: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 35,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  bookingDetailesHeader: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchPageBackBtn: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    textAlign: "center",
    paddingLeft: 13,
    marginRight: 15,
    paddingTop: 10,
    cursor: "pointer",
  },
  bookingDetailesHeaderName: {
    fontSize: 16,
    fontWeight: "500",
  },
  bookingStatusWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 4,
    padding: 12,
    marginTop: 15,
  },
  bookingStatusName: {
    color: "#9D9D9D",
  },
  activityScheduleWrapper: {
    marginVertical: 20,
  },
  activityScheduleNameWrapper: {
    flexDirection: "row",
  },
  activityScheduleName: {
    color: "#9D9D9D",
    marginLeft: 10,
  },
});
