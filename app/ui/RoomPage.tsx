import React, { useLayoutEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import StarRating from "./StarRating";
import { Progress, Carousel } from "@ant-design/react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LanguageSelectorDrawer from "./LanguageSelectorDrawer";
import ChangeCurrencyDrawer from "./ChangeCurrencyDrawer";
import * as Clipboard from "expo-clipboard";

import AntDesign from "@expo/vector-icons/AntDesign";

import RoomAmenities from "../../components/RoomAmenities";
import RoomPageSlider from "@/components/roomPageComponents/RoomPageSlider";
import RoomDetailes from "@/components/roomPageComponents/RoomDetailes";
import Reviews from "@/components/hotelPageComponents/Reviews";
import AuthorDetailes from "@/components/hotelPageComponents/AuthorDetailes";

const RoomPage = () => {
  const {
    hotelRoom,
    hotelId,
    closeChange,
    openDrawerCurrency,
    openDrawerLanguage,
    roomId,
  } = useGlobalState();

  const navigation = useNavigation();
  const router = useRouter();

  const navigateToCheckout = (hotel, room) => {
    router.push(`/ui/Checkout/?id=${hotel}&room=${room}`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <GestureHandlerRootView>
        <ScrollView>
          <RoomPageSlider />
          <TouchableOpacity activeOpacity={1} onPress={closeChange}>
            {hotelRoom && hotelRoom.room ? (
              <View style={styles.roomDetailsWrapper}>
                <RoomDetailes />
                <View style={styles.horizontalLine}></View>
                <View>
                  <RoomAmenities state={false} data={null} />
                </View>
                <View style={styles.horizontalLine}></View>
                <AuthorDetailes />
              </View>
            ) : (
              <Text>Loading</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
        <ChangeCurrencyDrawer
          onOpen={(openFunction) => {
            openDrawerCurrency.current = openFunction;
          }}
        />
        <LanguageSelectorDrawer
          onOpen={(openFunction) => {
            openDrawerLanguage.current = openFunction;
          }}
        />
      </GestureHandlerRootView>
      <View>
        <TouchableOpacity
          onPress={() => navigateToCheckout(hotelId, roomId)}
          activeOpacity={1}
          style={styles.reserveBtn}
        >
          <Text style={{ color: "white" }}>Reserve now</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white" }}>$2500</Text>
            <Text style={{ color: "#9D9D9D" }}>/ total</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RoomPage;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: 240,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  cardImage: {
    width: "100%",
    height: 240,
    position: "relative",
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  flex: {
    flexDirection: "row",
    marginVertical: 15,
  },
  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },

  pictureCount: {
    position: "absolute",
    zIndex: 2,
    width: 68,
    height: 32,
    top: 195,
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
  roomDetailsWrapper: {
    width: "85%",
    marginHorizontal: "auto",
    marginTop: 25,
    marginBottom: 20,
  },

  amenitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  amenitiesWrapper: {
    flexDirection: "row",
    margin: 10,
  },
  amenitiesText: {
    marginTop: 2,
    marginLeft: 10,
  },
  amenitiesCycle: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 15,
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
  reserveBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",

    marginHorizontal: "auto",
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 48,
    alignItems: "center",

    backgroundColor: "#212628",
  },
  disabled: {
    color: "#EDEDED",
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
  starRatingWrapper: {
    marginLeft: 10,
    marginRight: 3,
  },
  pointsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  pointsText: {
    marginVertical: 15,
    marginRight: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 3,
  },
  profileDetailes: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileDetailesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  userReview: {
    width: 276,
    marginLeft: 52,
  },
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
