import React, { useLayoutEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useNavigation, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import LanguageSelectorDrawer from "./LanguageSelectorDrawer";
import ChangeCurrencyDrawer from "./ChangeCurrencyDrawer";
import Amenities from "../../components/Amenities";
import Activities from "./Activities";

import HotelPrice from "@/components/hotelPageComponents/HotelPrice";
import Dates from "@/components/hotelPageComponents/Dates";
import Time from "@/components/hotelPageComponents/Time";
import Map from "@/components/hotelPageComponents/Map";
import AuthorDetailes from "@/components/hotelPageComponents/AuthorDetailes";
import Button from "@/components/hotelPageComponents/Button";
import Slider from "@/components/hotelPageComponents/Slider";

const HotelPage = () => {
  const { hotelInfo, setHotelId, openDrawerCurrency, openDrawerLanguage } =
    useGlobalState();

  const navigation = useNavigation();

  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (!hotelInfo) {
    return <Text>Hotel not found</Text>;
  }

  return (
    <>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.marginBottom}>
            <Slider />
            <View style={styles.container}>
              <Text style={styles.hotelName}>
                {hotelInfo.hotel.translations[0].title}
              </Text>
              {/* <Ratings /> */}
              <HotelPrice />
              <Text style={styles.description}>
                {hotelInfo.hotel.translations[0].description}
              </Text>
              <View style={styles.horizontalLine}></View>
              <Dates />
              <View style={styles.horizontalLine}></View>
              <Time />
              {/* <Languages /> */}
              <View style={styles.horizontalLine}></View>
              <Amenities Api={hotelInfo.hotel} />
              <View style={styles.horizontalLine}></View>
              {hotelInfo.hotel.premium_services.length > 0 && <Activities />}
              <View style={styles.horizontalLine}></View>
              <Map />
              {/* <Reviews /> */}
              <View style={styles.horizontalLine}></View>
              <AuthorDetailes />
              <View style={styles.horizontalLine}></View>
              {/* <Rooms /> */}
            </View>
          </View>
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
        <Button />
      </GestureHandlerRootView>
    </>
  );
};

export default HotelPage;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
  },
  flex: {
    flexDirection: "row",
    marginVertical: 15,
  },
  marginBottom: {
    marginBottom: 70,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },

  cardHeartUnselected: {
    height: 48,
    width: 48,
    borderRadius: 3,
    textAlign: "center",
    paddingLeft: 5,
    paddingTop: 5,
    marginHorizontal: 8,
    backgroundColor: "#2126284d",
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
  hotelName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212628",
    marginTop: 20,
  },

  description: {
    width: 328,
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },
  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
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

  roomAmenitie: {
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
});
