import React, { useLayoutEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Carousel } from "@ant-design/react-native";

const activitiesDetails = () => {
  const { db, premiumService, changeCurrency } = useGlobalState();
  const [loading, setIsLoading] = useState();
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const carouselRef = useRef<Carousel | null>(null);

  const onHorizontalSelectedIndexChange = (index: number) => {
    setSelectedIndex(index);
  };
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const navigateToHotelImages = (item) => {
    router.push(`/ui/PremiumServiceImg/?id=${premiumService.id}`);
  };

  return (
    <>
      <ScrollView>
        <View>
          <View>
            <View>
              <Carousel
                style={styles.wrapper}
                selectedIndex={selectedIndex}
                autoplay
                infinite
                afterChange={onHorizontalSelectedIndexChange}
                ref={carouselRef}
              >
                {premiumService &&
                premiumService.premiumService &&
                premiumService.premiumService.images ? (
                  premiumService.premiumService.images.map((images) => {
                    return (
                      <View style={[styles.containerHorizontal]}>
                        <Image
                          style={styles.cardImage}
                          source={{ uri: images.url }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text>loading...</Text>
                )}
              </Carousel>
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
                  style={styles.headerBtnWrapper}
                  activeOpacity={1}
                >
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigateToHotelImages(premiumService.premiumService)
              }
              style={styles.pictureCount}
            >
              <AntDesign name="picture" size={24} color="white" />
              <Text style={styles.pictureCountText}>1/10</Text>
            </TouchableOpacity>
          </View>
          {premiumService &&
          premiumService.premiumService &&
          premiumService.premiumService.translations ? (
            <View style={styles.container}>
              <Text style={styles.activityName}>
                {premiumService.premiumService.translations[0].title}
              </Text>
              <Text style={styles.description}>
                {premiumService.premiumService.translations[0].description}
              </Text>
              <View style={styles.horizontalLine}></View>
              <View style={{ marginBottom: 70 }}>
                <Text style={styles.text}>Check in & Check Times</Text>
                <View style={styles.checkInTime}>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign name="clockcircleo" size={24} color="black" />

                    <Text style={styles.checkInTimeText}>Departure</Text>
                  </View>
                  <Text>May 26th, 8:00 AM</Text>
                </View>
                <View style={styles.checkInTime}>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                    <Text style={styles.checkInTimeText}>Return</Text>
                  </View>
                  <Text>May 26th, 9:00 PM</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text>loading...</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.showBtnWrapper}>
        <TouchableOpacity activeOpacity={1} style={styles.showBtnActive}>
          <Text style={styles.showBtnText}>Add to bill</Text>
          <Text style={{ color: "white" }}>
            {premiumService && premiumService.premiumService
              ? premiumService.premiumService.price
              : null}
            {changeCurrency === "usd" ? "$" : "₾"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default activitiesDetails;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
  },
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
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
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
  pictureCount: {
    position: "absolute",
    zIndex: 2,
    width: 68,
    height: 32,
    top: 182,
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
  activityName: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
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
  checkInDateText: {
    marginLeft: 10,
    marginTop: 2,
  },
  checkInTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkInTimeText: {
    marginLeft: 10,
    marginTop: 1,
    color: "#9D9D9D",
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
