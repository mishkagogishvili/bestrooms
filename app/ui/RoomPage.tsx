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

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const RoomPage = () => {
  const {
    db,
    hotelRoom,
    hotelId,
    closeChange,
    showChangeContent,
    toggleChange,
    showChange,
    showChangeContentFunction,
    handleOpenCurrencyDrawer,
    handleOpenLanguageDrawer,
    openDrawerCurrency,
    openDrawerLanguage,
    roomId,
    hotelInfo,
    language,
    changeCurrency,
  } = useGlobalState();

  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const carouselRef = useRef<Carousel | null>(null);

  const onHorizontalSelectedIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const navigation = useNavigation();
  const router = useRouter();

  const percent5 = 68;
  const percent4 = 28;
  const percent3 = 4;
  const percent2 = 0;
  const percent1 = 0;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const navigateToCheckout = (hotel, room) => {
    router.push(`/ui/Checkout/?id=${hotel}&room=${room}`);
  };

  const navigateToRoomImages = (room) => {
    router.push(`/ui/RoomPageImg/?id=${room.id}`);
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
          <TouchableOpacity activeOpacity={1} onPress={closeChange}>
            <View>
              {hotelRoom.images && hotelRoom.images.length > 0 && (
                <View>
                  <View style={{ marginTop: 30 }}>
                    <View>
                      <Carousel
                        style={styles.wrapper}
                        selectedIndex={selectedIndex}
                        autoplay
                        infinite
                        afterChange={onHorizontalSelectedIndexChange}
                        ref={carouselRef}
                      >
                        {hotelRoom.images.map((images) => {
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
                    </View>
                  </View>
                </View>
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
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="black"
                    />
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
              <TouchableOpacity
                onPress={() => navigateToRoomImages(hotelRoom)}
                activeOpacity={1}
                style={styles.pictureCount}
              >
                <AntDesign name="picture" size={24} color="white" />
                <Text style={styles.pictureCountText}>
                  1/
                  {hotelRoom.translations && hotelRoom.translations.length > 0
                    ? hotelRoom.images.length
                    : "loading..."}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.roomDetailsWrapper}>
              <Text style={styles.roomName}>
                {hotelRoom.translations && hotelRoom.translations.length > 0
                  ? hotelRoom.translations[0].title
                  : "loading..."}
              </Text>
              <View style={styles.dates}>
                <Text style={{ color: "#9D9D9D" }}>22 may - 30 june</Text>
                <Text style={{ color: "#9D9D9D" }}>12 nights</Text>
              </View>
              <View style={styles.dates}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text>
                    {changeCurrency === "usd" ? "$" : "₾"}
                    {hotelRoom.price}
                  </Text>
                  <Text style={{ color: "#9D9D9D" }}>/ night</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 24, marginRight: 5 }}>$2500</Text>
                  <Text style={{ color: "#9D9D9D", marginTop: 10 }}>
                    / total
                  </Text>
                </View>
              </View>
              <Text style={{ fontWeight: 500, marginTop: 10 }}>
                {hotelRoom.translations && hotelRoom.translations.length > 0
                  ? hotelRoom.translations[0].description
                  : "loading..."}
              </Text>
              <View style={styles.horizontalLine}></View>
              <View>
                <View style={styles.amenitiesHeader}>
                  <Text style={styles.text}>Property Amenities</Text>
                  <Text style={styles.text}>(free access)</Text>
                </View>
                <View style={styles.amenitiesWrapper}>
                  <AntDesign name="wifi" size={24} color="black" />
                  <Text style={styles.amenitiesText}>Free high speed Wifi</Text>
                </View>
                <View style={styles.amenitiesCycle}>
                  <FontAwesome5 name="wine-glass-alt" size={24} color="black" />
                  <Text style={styles.amenitiesText}>24 Hour Bar</Text>
                </View>
                <View style={styles.amenitiesWrapper}>
                  <FontAwesome5 name="bicycle" size={24} color="black" />
                  <Text style={styles.amenitiesText}>Gym Area</Text>
                </View>
                <TouchableOpacity activeOpacity={1} style={styles.amenitiesBtn}>
                  <Text style={styles.amenitiesBtnText}>
                    View all Amenities (35)
                  </Text>
                </TouchableOpacity>
              </View>
              {/* ოთახის რევიუები */}
              {/* <View style={styles.horizontalLine}></View>
              <View>
                <View style={styles.flex}>
                  <View style={styles.singleStarWrapper}>
                    <Text>Hotel reviews</Text>
                    <Text style={styles.review}>(123 reviews)</Text>
                  </View>
                  <View style={styles.starRatingWrapper}>
                    <StarRating defaultRating={5} onSetRating={() => {}} />
                  </View>
                  <Text style={styles.rating}>5</Text>
                </View>
                <View>
                  <View style={styles.pointsWrapper}>
                    <Text
                      style={[
                        styles.pointsText,
                        percent5 < 1 && styles.disabled,
                      ]}
                    >
                      5 points
                    </Text>
                    <View style={styles.progress}>
                      <View
                        style={{
                          marginRight: 10,
                          height: 4,
                          flex: 1,
                        }}
                      >
                        <Progress
                          barStyle={
                            percent5 < 1
                              ? { borderColor: "#9D9D9D" }
                              : { borderColor: "#FFD363" }
                          }
                          percent={percent5}
                        />
                      </View>
                    </View>
                    <Text
                      style={[styles.text, percent5 < 1 && styles.disabled]}
                    >
                      ({percent5}%)
                    </Text>
                  </View>
                  <View style={styles.pointsWrapper}>
                    <Text
                      style={[
                        styles.pointsText,
                        percent4 < 1 && styles.disabled,
                      ]}
                    >
                      4 points
                    </Text>
                    <View style={styles.progress}>
                      <View
                        style={{
                          marginRight: 10,
                          height: 4,
                          flex: 1,
                        }}
                      >
                        <Progress
                          barStyle={
                            percent4 < 1
                              ? { borderColor: "#9D9D9D" }
                              : { borderColor: "#FFD363" }
                          }
                          percent={percent4}
                        />
                      </View>
                    </View>
                    <Text
                      style={[styles.text, percent4 < 1 && styles.disabled]}
                    >
                      ({percent4}%)
                    </Text>
                  </View>
                  <View style={styles.pointsWrapper}>
                    <Text
                      style={[
                        styles.pointsText,
                        percent3 < 1 && styles.disabled,
                      ]}
                    >
                      3 points
                    </Text>
                    <View style={styles.progress}>
                      <View
                        style={{
                          marginRight: 10,
                          height: 4,
                          flex: 1,
                        }}
                      >
                        <Progress
                          barStyle={
                            percent3 < 1
                              ? { borderColor: "#9D9D9D" }
                              : { borderColor: "#FFD363" }
                          }
                          percent={percent3}
                        />
                      </View>
                    </View>
                    <Text
                      style={[styles.text, percent3 < 1 && styles.disabled]}
                    >
                      ({percent3}%)
                    </Text>
                  </View>
                  <View style={styles.pointsWrapper}>
                    <Text
                      style={[
                        styles.pointsText,
                        percent2 < 1 && styles.disabled,
                      ]}
                    >
                      2 points
                    </Text>
                    <View style={styles.progress}>
                      <View
                        style={{
                          marginRight: 10,
                          height: 4,
                          flex: 1,
                        }}
                      >
                        <Progress
                          barStyle={
                            percent2 < 1
                              ? { borderColor: "#9D9D9D" }
                              : { borderColor: "#FFD363" }
                          }
                          percent={percent2}
                        />
                      </View>
                    </View>
                    <Text
                      style={[styles.text, percent2 < 1 && styles.disabled]}
                    >
                      ({percent2}%)
                    </Text>
                  </View>
                  <View style={styles.pointsWrapper}>
                    <Text
                      style={[
                        styles.pointsText,
                        percent1 < 1 && styles.disabled,
                      ]}
                    >
                      1 points
                    </Text>
                    <View style={styles.progress}>
                      <View
                        style={{
                          marginRight: 10,
                          height: 4,
                          flex: 1,
                        }}
                      >
                        <Progress
                          barStyle={
                            percent1 < 1
                              ? { borderColor: "#9D9D9D" }
                              : { borderColor: "#FFD363" }
                          }
                          percent={percent1}
                        />
                      </View>
                    </View>
                    <Text
                      style={[styles.text, percent1 < 1 && styles.disabled]}
                    >
                      ({percent1}%)
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{ marginBottom: 25 }}>
                    <View style={styles.profileDetailesWrapper}>
                      <View style={styles.profileDetailes}>
                        <FontAwesome5
                          name="user-circle"
                          size={28}
                          color="black"
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: "500" }}>
                            Levan Sanadiradzde
                          </Text>
                          <Text style={{ color: "#9D9D9D" }}>April 2021</Text>
                        </View>
                      </View>
                      <Text style={styles.text}>5.0</Text>
                    </View>
                    <Text style={styles.userReview}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempora incididunt ut labore et dolore.
                    </Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                    <View style={styles.profileDetailesWrapper}>
                      <View style={styles.profileDetailes}>
                        <FontAwesome5
                          name="user-circle"
                          size={28}
                          color="black"
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: "500" }}>
                            Nodar popkhadze
                          </Text>
                          <Text style={{ color: "#9D9D9D" }}>April 2021</Text>
                        </View>
                      </View>
                      <Text style={styles.text}>4.0</Text>
                    </View>
                    <Text style={styles.userReview}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempora incididunt ut labore et dolore
                      magna das aliqua. Ut enim ad minim veniam.
                    </Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                    <View style={styles.profileDetailesWrapper}>
                      <View style={styles.profileDetailes}>
                        <FontAwesome5
                          name="user-circle"
                          size={28}
                          color="black"
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: "500" }}>
                            Giorgi birkadze
                          </Text>
                          <Text style={{ color: "#9D9D9D" }}>April 2021</Text>
                        </View>
                      </View>
                      <Text style={styles.text}>5.0</Text>
                    </View>
                    <Text style={styles.userReview}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempora incididunt ut labore et dolore
                      magna.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={1} style={styles.amenitiesBtn}>
                  <Text style={styles.amenitiesBtnText}>
                    View all reviews (34)
                  </Text>
                </TouchableOpacity>
              </View> */}
              <View style={styles.horizontalLine}></View>
              <View style={{ marginVertical: 35 }}>
                <View style={{ flexDirection: "row" }}>
                  {/* <Image
                    source={require("../../assets/images/profilePicture.png")}
                  /> */}
                  <Text style={styles.authorDetails}>
                    Hosted By jolyne kujoh
                  </Text>
                </View>
                <View style={styles.authordetailes}>
                  <Text style={{ fontWeight: "500" }}>{hotelInfo.phone}</Text>
                  <TouchableOpacity style={{ flexDirection: "row" }}>
                    <AntDesign name="copy1" size={20} color="#9d9d9d" />
                    <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                      copy
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.authordetailes}>
                  <Text style={{ fontWeight: "500" }}>{hotelInfo.email}</Text>
                  <TouchableOpacity style={{ flexDirection: "row" }}>
                    <AntDesign name="copy1" size={20} color="#9d9d9d" />
                    <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                      copy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
  },
  roomName: {
    fontSize: 16,
    fontWeight: "500",
  },
  dates: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
