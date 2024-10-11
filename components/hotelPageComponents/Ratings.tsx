import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StarRating from "@/app/ui/StarRating";
import { useGlobalState } from "../context/GlobalStateProvider";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Ratings = () => {
  const { setUserRating, hotelInfo } = useGlobalState();
  return (
    <View style={styles.cardContentFirstSection}>
      <View style={styles.singleStarWrapper}>
        <FontAwesome5 name="star-half-alt" size={24} color="#FFD363" />
        <Text style={styles.rating}>{hotelInfo.hotel.star_rating}</Text>
        {/* <Text style={styles.review}>({hotelInfo.hotel.reviews} reviews)</Text> */}
        <Text style={styles.review}>(0 reviews)</Text>
      </View>
      <TouchableOpacity activeOpacity={1}>
        <StarRating
          defaultRating={hotelInfo.hotel.star_rating}
          onSetRating={setUserRating}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  cardContentFirstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  singleStarWrapper: {
    flexDirection: "row",
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
  },
  review: {
    fontSize: 16,
    marginLeft: 5,
    color: "#9d9d9d",
  },
});
