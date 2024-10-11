import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGlobalState } from "../context/GlobalStateProvider";
import RoomAmenities from "../RoomAmenities";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Rooms = () => {
  const { hotelInfo, changeCurrency, setHotelId, setRoomId } = useGlobalState();

  const router = useRouter();

  const navigateToRoom = (hotelId, roomId) => {
    router.push(`/ui/RoomPage/?id=${roomId}`);
    setHotelId(hotelId);
    setRoomId(roomId);
  };

  const navigateToRooms = (item) => {
    router.push(`/ui/RoomsPage/?id=${item.id}`);
    setHotelId(item.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigateToRooms(hotelInfo.hotel)}
    >
      <Text style={styles.text}>Available rooms</Text>
      {hotelInfo && hotelInfo.hotel.rooms ? (
        hotelInfo.hotel.rooms.map((room) => {
          return (
            <View key={room.id} style={{ marginHorizontal: "auto" }}>
              <Image
                style={styles.roomImage}
                source={{ uri: room.images[0]?.url }}
              />
              <Text style={styles.text}>{room.translations[0].title}</Text>
              <View style={{ flexDirection: "row" }}>
                {room.amenities ? (
                  <RoomAmenities state={true} data={room.amenities} />
                ) : null}
              </View>
              <View style={styles.cardContentSecondSection}>
                {/* item cacelation პროპი უნდა */}
                <View style={styles.freeCancelation}>
                  <View style={styles.freeCancelationView}>
                    <AntDesign name="check" size={20} color="#208e17" />
                  </View>
                  <Text style={styles.freeCancelationText}>
                    Free Cancelation
                  </Text>
                </View>
                <View style={styles.priceNightWrapper}>
                  <Text style={styles.price}>
                    {changeCurrency === "usd" ? "$" : "₾"}
                    {room.price}
                  </Text>
                  <Text style={styles.night}> / night</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigateToRoom(hotelInfo.hotel.id, room.id)}
                activeOpacity={1}
                style={styles.amenitiesBtn}
              >
                <Text style={styles.amenitiesBtnText}>See details</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text>Loading...</Text>
      )}
    </TouchableOpacity>
  );
};

export default Rooms;

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
  roomImage: {
    width: 328,
    height: 196,
    resizeMode: "cover",
  },
  cardContentSecondSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  freeCancelation: {
    flexDirection: "row",
    color: "#208e17",
    backgroundColor: "#e7f5e6",
    marginTop: 5,
  },
  freeCancelationView: {
    marginRight: 5,
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#208e17",
    borderStyle: "solid",
    borderRadius: 50,
  },
  freeCancelationText: {
    color: "#208e17",
  },
  amenitiesBtn: {
    marginVertical: 10,
    height: 48,
    alignItems: "center",
    paddingTop: 12,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  amenitiesBtnText: {
    fontWeight: "500",
    color: "#434343",
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
