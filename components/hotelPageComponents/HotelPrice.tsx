import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalState } from "../context/GlobalStateProvider";

const HotelPrice = () => {
  const { hotelInfo } = useGlobalState();
  return (
    <View style={styles.cardContentSecondSection}>
      <Text style={styles.SecondSectionText}>
        {hotelInfo.hotel.city} {hotelInfo.hotel.region}
      </Text>
      <View style={styles.priceNightWrapper}>
        <Text style={styles.price}>
          {hotelInfo.hotel.currency === "gel" ? "₾" : "$"}
          {hotelInfo.hotel.rooms[0].price}
        </Text>

        <Text style={styles.night}> / night</Text>
      </View>
    </View>
  );
};

export default HotelPrice;

const styles = StyleSheet.create({
  cardContentSecondSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  SecondSectionText: {
    color: "#9D9D9D",
    fontWeight: "500",
    fontSize: 16,
  },
  priceNightWrapper: {
    flexDirection: "row",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  night: {
    marginTop: 5,
    color: "#c4c4c4",
  },
});
