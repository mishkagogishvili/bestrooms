import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

const RoomImagesView = () => {
  const { url, photos, image, roomImages, selectedIndex, imageCount } =
    useLocalSearchParams();

  const { hotelRoom } = useGlobalState();

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const hotelImage = hotelRoom.images;

  const foundImage = hotelImage.find((image) => image.url === url);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "room images",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Text>
            {foundImage.id} / {` `}
            {hotelRoom.images.length}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.imageWrapper}>
        <Image style={styles.imageStyle} source={{ uri: url }} />
      </View>
      <View style={styles.showBtnWrapper}>
        <TouchableOpacity activeOpacity={1} style={styles.showBtnActive}>
          <Text style={styles.showBtnText}>Select Room</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#9d9d9d", marginTop: 2 }}>from </Text>
            <Text style={styles.showBtnText}>$25</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default RoomImagesView;

const styles = StyleSheet.create({
  backBtn: {
    marginHorizontal: 20,
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 12,
  },
  imageWrapper: {
    width: "80%",
    marginHorizontal: "auto",
    top: 196,
  },
  imageStyle: {
    width: 328,
    height: 244,
    borderRadius: 4,
    opacity: 0.9,
  },
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
