import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { useGlobalState } from "../context/GlobalStateProvider";

import AntDesign from "@expo/vector-icons/AntDesign";

const AuthorDetailes = () => {
  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };

  const { hotelInfo } = useGlobalState();
  return (
    <View style={{ marginTop: 25 }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.authorDetails}>Hosted By jolyne kujoh</Text>
      </View>
      <View style={styles.authordetailes}>
        <Text style={{ fontWeight: "500" }}>{hotelInfo.hotel.phone}</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flexDirection: "row" }}
          onPress={() => copyToClipboard(hotelInfo.hotel.phone)}
        >
          <AntDesign name="copy1" size={20} color="#9d9d9d" />
          <Text style={{ marginLeft: 10, fontWeight: "500" }}>copy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.authordetailes}>
        <Text style={{ fontWeight: "500" }}>{hotelInfo.hotel.email}</Text>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => copyToClipboard(hotelInfo.hotel.email)}
        >
          <AntDesign name="copy1" size={20} color="#9d9d9d" />
          <Text style={{ marginLeft: 10, fontWeight: "500" }}>copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthorDetailes;

const styles = StyleSheet.create({
  authorDetails: {
    fontWeight: "500",
    marginTop: 10,
  },
  authordetailes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
