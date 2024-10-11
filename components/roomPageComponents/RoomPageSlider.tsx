import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Progress, Carousel } from "@ant-design/react-native";
import { useGlobalState } from "../context/GlobalStateProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation, useRouter } from "expo-router";

const RoomPageSlider = () => {
  const {
    hotelRoom,
    showChangeContent,
    toggleChange,
    showChange,
    showChangeContentFunction,
    handleOpenCurrencyDrawer,
    handleOpenLanguageDrawer,
  } = useGlobalState();
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const carouselRef = useRef<Carousel | null>(null);

  const onHorizontalSelectedIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const router = useRouter();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const navigateToRoomImages = (room) => {
    router.push(`/ui/RoomPageImg/?id=${room.id}`);
  };
  return (
    <View>
      {hotelRoom &&
        hotelRoom.room &&
        hotelRoom.room.images &&
        hotelRoom.room.images.length > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigateToRoomImages(hotelRoom.room)}
            style={{ marginTop: 30 }}
          >
            <Carousel
              style={styles.wrapper}
              selectedIndex={selectedIndex}
              autoplay
              infinite
              afterChange={onHorizontalSelectedIndexChange}
              ref={carouselRef}
            >
              {hotelRoom.room.images.map((images) => {
                return (
                  <View
                    style={[
                      styles.containerHorizontal,
                      { backgroundColor: "red" },
                    ]}
                  >
                    <Image
                      style={styles.cardImage}
                      source={{ uri: images.url }}
                    />
                  </View>
                );
              })}
            </Carousel>
          </TouchableOpacity>
        )}
      <View style={styles.hotelPageHeaderWrapper}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.headerBtnWrapper}
          activeOpacity={1}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.hotelPageHeaderRightSection}>
          <TouchableOpacity
            style={styles.headerBtnWrapper}
            activeOpacity={1}
            onPress={toggleChange}
          >
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={[
              styles.roomPageChangeWrapper,
              !showChange && { display: "none" },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.roomPageChangeLanguage,
                showChangeContent === 1 && {
                  backgroundColor: "#f5f5f5",
                },
              ]}
              activeOpacity={1}
              onPress={() => (
                showChangeContentFunction(1), handleOpenLanguageDrawer()
              )}
            >
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 12,
                }}
              >
                Change language
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roomPageChangeLanguage,
                showChangeContent === 2 && {
                  backgroundColor: "#f5f5f5",
                },
              ]}
              activeOpacity={1}
              onPress={() => (
                showChangeContentFunction(2), handleOpenCurrencyDrawer()
              )}
            >
              <Text style={{ textAlign: "center", paddingTop: 12 }}>
                Change currency
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomPageSlider;

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
  hotelPageHeaderWrapper: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    top: 45,
  },
  hotelPageHeaderRightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "relative",
  },
  roomPageChangeWrapper: {
    position: "absolute",
    width: 168,
    height: 96,
    backgroundColor: "white",
    top: 50,
    right: 14,
    zIndex: 10,
    borderRadius: 5,
  },
  roomPageChangeLanguage: {
    height: 48,
  },
  headerBtnWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
    justifyContent: "center",
  },
});
