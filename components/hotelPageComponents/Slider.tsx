import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Carousel } from "@ant-design/react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useGlobalState } from "../context/GlobalStateProvider";

const Slider = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const carouselRef = useRef<Carousel | null>(null);

  const onHorizontalSelectedIndexChange = (index: number) => {
    setSelectedIndex(index);
  };
  const {
    toggleFavorite,
    hotelInfo,
    toggleChange,
    showChangeContent,
    showChange,
    showChangeContentFunction,
    handleOpenCurrencyDrawer,
    handleOpenLanguageDrawer,
  } = useGlobalState();

  const router = useRouter();
  const navigation = useNavigation();

  const navigateToHotelImages = (item) => {
    router.push(`/ui/HotelImages/?id=${item.id}`);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigateToHotelImages(hotelInfo.hotel)}
          >
            <Carousel
              style={styles.wrapper}
              selectedIndex={selectedIndex}
              autoplay
              infinite
              afterChange={onHorizontalSelectedIndexChange}
              ref={carouselRef}
            >
              {hotelInfo && hotelInfo.hotel.images ? (
                hotelInfo.hotel.images.map((images) => {
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
                })
              ) : (
                <Text>Loading...</Text>
              )}
            </Carousel>
          </TouchableOpacity>
        </View>
      </View>
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
            activeOpacity={1}
            // style={
            //   hotelInfo.isFavorite
            //     ? styles.cardHeart
            //     : styles.cardHeartUnselected
            // }
            style={styles.cardHeart}
            onPress={() => {
              toggleFavorite(hotelInfo.hotel.id);
            }}
          >
            <AntDesign
              style={styles.heartIcon}
              name="heart"
              size={24}
              color="#FF0000"
            />

            {/* {hotelInfo.isFavorite ? (
        <AntDesign tyle={styles.heartIcon} name="heart" size={24}  color="#FF0000"/>
        ) : (
        <AntDesign   style={styles.heartIconUnselected} name="hearto" size={24} color="white"" />
        )} */}
          </TouchableOpacity>
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

export default Slider;

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
  },
  headerBtnWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
    justifyContent: "center",
  },
  cardHeart: {
    height: 48,
    width: 48,
    backgroundColor: "white",
    borderRadius: 3,
    textAlign: "center",
    paddingLeft: 5,
    paddingTop: 5,
    marginHorizontal: 8,
  },
  heartIcon: {
    paddingTop: 8,
    paddingLeft: 8,
    color: "#f05353",
  },
  heartIconUnselected: {
    paddingTop: 8,
    paddingLeft: 8,
    color: "white",
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
});
