import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useGlobalState } from "../context/GlobalStateProvider";

const Button = () => {
  const { hotelInfo, setHotelId } = useGlobalState();

  const router = useRouter();

  const navigateToRooms = (item) => {
    router.push(`/ui/RoomsPage/?id=${item.id}`);
    setHotelId(item.id);
  };

  return (
    <View style={styles.showBtnWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.showBtnActive}
        onPress={() => navigateToRooms(hotelInfo.hotel)}
      >
        <Text style={styles.showBtnText}>Select Room</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#9d9d9d", marginTop: 2 }}>from </Text>
          <Text style={styles.showBtnText}>$25</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  showBtnWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 15,
    zIndex: 2,
  },

  showBtnText: {
    color: "white",
    fontSize: 16,
  },
  showBtnActive: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 328,
    height: 48,
    borderRadius: 4,
    backgroundColor: "#212628",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
