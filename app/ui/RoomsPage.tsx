import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const RoomsPage = () => {
  const {
    db,
    hotelRooms,
    setRoomId,
    hotelId,
    setHotelId,
    hotelList,
    changeCurrency,
  } = useGlobalState();
  const { id } = useGlobalSearchParams();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const navigation = useNavigation();

  const item = hotelList.find((item) => item.id === parseInt(id, 10));

  const navigateToCheckout = (hotel, room) => {
    router.push(`/ui/Checkout/?id=${hotel}&room=${room}`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Available for rent",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Text style={styles.resetFilters}> {hotelRooms.length} rooms</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const router = useRouter();

  const navigateToRoom = (hotelId, roomId) => {
    router.push(`/ui/RoomPage/?id=${roomId}`);
    setHotelId(hotelId);
    setRoomId(roomId);
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 25 }}>
        {hotelRooms.map((room) => {
          return (
            <>
              <View style={{ marginHorizontal: "auto" }}>
                <Image
                  style={styles.roomImage}
                  source={{ uri: room.images[0]?.url }}
                />
                <Text style={styles.text}>{room.translations[0].title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.roomAmenetie}>
                    <AntDesign name="wifi" size={24} color="black" />
                    <Text style={{ marginTop: 2 }}>Wifi</Text>
                  </View>
                  <View style={styles.roomAmenetie}>
                    <FontAwesome5 name="bed" size={24} color="black" />
                    <Text style={{ marginTop: 2 }}>1 king size bed</Text>
                  </View>
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
                  onPress={() => navigateToRoom(item.id, room.id)}
                  activeOpacity={1}
                  style={styles.amenitiesBtn}
                >
                  <Text style={styles.amenitiesBtnText}>See details</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalLine}></View>
            </>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default RoomsPage;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginVertical: 35,
    width: "80%",
    marginHorizontal: "auto",
  },
  text: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#434343",
  },
  backBtn: {
    marginHorizontal: 20,
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 12,
  },
  roomImage: {
    width: 328,
    height: 196,
  },
  pictureCount: {
    position: "absolute",
    zIndex: 2,
    width: 68,
    height: 32,
    top: 145,
    right: 20,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    cursor: "pointer",
    backgroundColor: "#2126284d",
    flexDirection: "row",
  },
  pictureCountText: {
    color: "white",
    paddingLeft: 2,
    paddingTop: 2,
  },
  roomAmenetie: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#9d9d9d",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginRight: 10,
    alignSelf: "flex-start",
    justifyContent: "space-between",
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
  nonRefundable: {
    flexDirection: "row",
    color: "#D42F33",
    backgroundColor: "#FFEBEE",

    marginTop: 5,
  },
  nonRefundableView: {
    marginRight: 5,
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#D42F33",
    borderStyle: "solid",
    borderRadius: 50,
  },
  nonRefundableText: {
    color: "#D42F33",
    marginLeft: 4,
    marginTop: -2,
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
  cardContentSecondSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  amenitiesBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    height: 48,
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#212628",
    borderRadius: 4,
  },
  amenitiesBtnText: {
    fontWeight: "500",
    color: "white",
  },
});
