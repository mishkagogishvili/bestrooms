import { Image, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { useGlobalState } from "../context/GlobalStateProvider";
import { Carousel } from "@ant-design/react-native";

const HotelPageSlider = () => {
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
  return (
    <>
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
                style={[styles.containerHorizontal, { backgroundColor: "red" }]}
              >
                <Image style={styles.cardImage} source={{ uri: images.url }} />
              </View>
            );
          })
        ) : (
          <Text>Loading...</Text>
        )}
      </Carousel>
    </>
  );
};

export default HotelPageSlider;

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
});
