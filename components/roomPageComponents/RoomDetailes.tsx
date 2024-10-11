import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalState } from "../context/GlobalStateProvider";

const RoomDetailes = () => {
  const { hotelRoom, changeCurrency, search, totalDays } = useGlobalState();
  return (
    <>
      <Text style={styles.roomName}>
        {hotelRoom.room.translations && hotelRoom.room.translations.length > 0
          ? hotelRoom.room.translations[0].title
          : "loading..."}
      </Text>
      <View style={styles.dates}>
        <Text style={{ color: "#9D9D9D" }}>
          {search[0].check_in} - {search[0].check_out}
        </Text>
        <Text style={{ color: "#9D9D9D" }}>{totalDays} nights</Text>
      </View>
      <View style={styles.dates}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text>
            {changeCurrency === "usd" ? "$" : "₾"}
            {hotelRoom.room.price}
          </Text>
          <Text style={{ color: "#9D9D9D" }}>/ night</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 24, marginRight: 5 }}>$2500</Text>
          <Text style={{ color: "#9D9D9D", marginTop: 10 }}>/ total</Text>
        </View>
      </View>
      <Text style={{ fontWeight: 500, marginTop: 10 }}>
        {hotelRoom.room.translations && hotelRoom.room.translations.length > 0
          ? hotelRoom.room.translations[0].description
          : "loading..."}
      </Text>
    </>
  );
};

export default RoomDetailes;

const styles = StyleSheet.create({
  roomName: {
    fontSize: 16,
    fontWeight: "500",
  },
  dates: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
