import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Progress, Button, Carousel } from "@ant-design/react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StarRating from "../ui/StarRating";
import LanguageSelectorDrawer from "./LanguageSelectorDrawer";
import ChangeCurrencyDrawer from "./ChangeCurrencyDrawer";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MapView, { Marker } from "react-native-maps";
import Amenities from "../../components/Amenities";
import Activities from "./Activities";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RoomAmenities from "@/components/RoomAmenities";

const HotelPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const carouselRef = useRef<Carousel | null>(null);

  const onHorizontalSelectedIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const percent5 = 68;
  const percent4 = 28;
  const percent3 = 4;
  const percent2 = 0;
  const percent1 = 0;

  const {
    hotelList,
    hotelRooms,
    setHotelId,
    setRoomId,
    toggleFavorite,
    setUserRating,
    hotelInfo,
    hotelId,
    search,
    region,
    setregion,
    ServiceId,
    setServiceId,
    toggleChange,
    showChangeContent,
    showChange,
    showChangeContentFunction,
    handleOpenCurrencyDrawer,
    handleOpenLanguageDrawer,
    openDrawerCurrency,
    openDrawerLanguage,
    changeCurrency,
  } = useGlobalState();

  const mapCoordinates = {
    latitude: parseFloat(hotelInfo.latitude),
    longitude: parseFloat(hotelInfo.longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const navigateToHotelImages = (item) => {
    router.push(`/ui/HotelImages/?id=${item.id}`);
  };
  const navigateToRooms = (item) => {
    router.push(`/ui/RoomsPage/?id=${item.id}`);
    setHotelId(item.id);
  };

  const navigateToRoom = (hotelId, roomId) => {
    router.push(`/ui/RoomPage/?id=${roomId}`);
    setHotelId(hotelId);
    setRoomId(roomId);
  };

  if (!hotelInfo) {
    return <Text>Hotel not found</Text>;
  }

  return (
    <>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.marginBottom}>
            <View>
              <View>
                <View style={{ marginTop: 30 }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigateToHotelImages(hotelInfo)}
                  >
                    <Carousel
                      style={styles.wrapper}
                      selectedIndex={selectedIndex}
                      autoplay
                      infinite
                      afterChange={onHorizontalSelectedIndexChange}
                      ref={carouselRef}
                    >
                      {hotelInfo && hotelInfo.images ? (
                        hotelInfo.images.map((images) => {
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
                      toggleFavorite(hotelInfo.id);
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
            </View>
            <View style={styles.container}>
              <Text style={styles.hotelName}>
                {hotelInfo.translations[0].title}
              </Text>
              <View style={styles.cardContentFirstSection}>
                <View style={styles.singleStarWrapper}>
                  <FontAwesome5
                    name="star-half-alt"
                    size={24}
                    color="#FFD363"
                  />
                  <Text style={styles.rating}>{hotelInfo.star_rating}</Text>
                  {/* <Text style={styles.review}>({hotelInfo.reviews} reviews)</Text> */}
                  <Text style={styles.review}>(0 reviews)</Text>
                </View>
                <TouchableOpacity activeOpacity={1}>
                  <StarRating
                    defaultRating={hotelInfo.star_rating}
                    onSetRating={setUserRating}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContentSecondSection}>
                <Text style={styles.SecondSectionText}>
                  {hotelInfo.city} {hotelInfo.region}
                </Text>
                <View style={styles.priceNightWrapper}>
                  {/* <Text style={styles.price}>${hotelInfo.price}</Text> */}
                  <Text style={styles.price}>$555</Text>
                  <Text style={styles.night}> / night</Text>
                </View>
              </View>
              <Text style={styles.description}>
                {hotelInfo.translations[0].description}
              </Text>
              <View style={styles.horizontalLine}></View>
              <View>
                <Text style={styles.text}>Check in & Check out dates</Text>
                <View style={styles.flex}>
                  <AntDesign name="calendar" size={24} color="black" />
                  <Text style={styles.checkInDateText}>
                    {search[0].check_in} - {search[0].check_out}
                  </Text>
                </View>
              </View>
              <View style={styles.horizontalLine}></View>
              <View>
                <Text style={styles.text}>Check in & Check Times</Text>
                <View style={styles.checkInTime}>
                  <View style={styles.flex}>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                    <Text style={styles.checkInTimeText}>Check in from:</Text>
                  </View>
                  <Text style={{ marginTop: 13 }}>
                    {hotelInfo.checkin_time}
                  </Text>
                </View>
                <View style={styles.checkInTime}>
                  <View style={styles.flex}>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                    <Text style={styles.checkInTimeText}>Check out from:</Text>
                  </View>
                  <Text style={{ marginTop: 13 }}>
                    {hotelInfo.checkout_time}
                  </Text>
                </View>
              </View>
              {/* ენები */}
              {/* <View style={styles.horizontalLine}></View>
            <View>
              <Text style={styles.text}>Available languages</Text>
              <View style={styles.languagesWrapper}>
                <View style={styles.languages}>
                  <CountryFlag isoCode="DE" size={20} />
                  <Text style={styles.languagesText}>German</Text>
                </View>
                <View style={styles.languages}>
                  <CountryFlag isoCode="GE" size={20} />
                  <Text style={styles.languagesText}>Georgian</Text>
                </View>
                <View style={styles.languages}>
                  <CountryFlag isoCode="Cn" size={20} />
                  <Text style={styles.languagesText}>Chinese</Text>
                </View>
              </View>
            </View> */}
              <View style={styles.horizontalLine}></View>
              <View>
                <Amenities Api={hotelInfo} />
              </View>
              <View style={styles.horizontalLine}></View>
              {hotelInfo.premium_services.length > 0 && <Activities />}

              <View style={styles.horizontalLine}></View>
              <View>
                <MapView region={mapCoordinates} style={styles.map}>
                  <Marker
                    coordinate={{
                      latitude: parseFloat(hotelInfo.latitude),
                      longitude: parseFloat(hotelInfo.longitude),
                    }}
                  />
                </MapView>
              </View>
              {/* შეფასებები */}
              {/* <View style={styles.horizontalLine}></View>
            <View>
              <View style={styles.flex}>
                <View style={styles.singleStarWrapper}>
                  <Text>Hotel reviews</Text>
                  <Text style={styles.review}>
                    ({hotelInfo.reviews} reviews)
                  </Text>
                  <Text style={styles.review}>(0 reviews)</Text>
                </View>
                <View style={styles.starRatingWrapper}>
                  <StarRating defaultRating={hotelInfo.star_rating} />
                </View>
                <Text style={styles.rating}>{hotelInfo.star_rating}</Text>
              </View>
              <View>
                <View style={styles.pointsWrapper}>
                  <Text
                    style={[styles.pointsText, percent5 < 1 && styles.disabled]}
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
                  <Text style={[styles.text, percent5 < 1 && styles.disabled]}>
                    ({percent5}%)
                  </Text>
                </View>
                <View style={styles.pointsWrapper}>
                  <Text
                    style={[styles.pointsText, percent4 < 1 && styles.disabled]}
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
                  <Text style={[styles.text, percent4 < 1 && styles.disabled]}>
                    ({percent4}%)
                  </Text>
                </View>
                <View style={styles.pointsWrapper}>
                  <Text
                    style={[styles.pointsText, percent3 < 1 && styles.disabled]}
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
                  <Text style={[styles.text, percent3 < 1 && styles.disabled]}>
                    ({percent3}%)
                  </Text>
                </View>
                <View style={styles.pointsWrapper}>
                  <Text
                    style={[styles.pointsText, percent2 < 1 && styles.disabled]}
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
                  <Text style={[styles.text, percent2 < 1 && styles.disabled]}>
                    ({percent2}%)
                  </Text>
                </View>
                <View style={styles.pointsWrapper}>
                  <Text
                    style={[styles.pointsText, percent1 < 1 && styles.disabled]}
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
                  <Text style={[styles.text, percent1 < 1 && styles.disabled]}>
                    ({percent1}%)
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ marginBottom: 25 }}>
                  <View style={styles.profileDetailesWrapper}>
                    <View style={styles.profileDetailes}>
                      <AntDesign name="user" size={28} color="black" />

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempora incididunt ut labore et dolore.
                  </Text>
                </View>
                <View style={{ marginBottom: 25 }}>
                  <View style={styles.profileDetailesWrapper}>
                    <View style={styles.profileDetailes}>
                      <AntDesign name="user" size={28} color="black" />
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempora incididunt ut labore et dolore magna das
                    aliqua. Ut enim ad minim veniam.
                  </Text>
                </View>
                <View style={{ marginBottom: 25 }}>
                  <View style={styles.profileDetailesWrapper}>
                    <View style={styles.profileDetailes}>
                      <AntDesign name="user" size={28} color="black" />
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempora incididunt ut labore et dolore magna.
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
              <View style={{ marginTop: 25 }}>
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
              <View style={styles.horizontalLine}></View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigateToRooms(hotelInfo)}
              >
                <Text style={styles.text}>Available rooms</Text>
                {hotelInfo && hotelInfo.rooms ? (
                  hotelInfo.rooms.map((room) => {
                    return (
                      <View key={room.id} style={{ marginHorizontal: "auto" }}>
                        <Image
                          style={styles.roomImage}
                          source={{ uri: room.images[0]?.url }}
                        />
                        <Text style={styles.text}>
                          {room.translations[0].title}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          {room.amenities ? (
                            <RoomAmenities state={true} data={room.amenities} />
                          ) : null}
                        </View>
                        <View style={styles.cardContentSecondSection}>
                          {/* item cacelation პროპი უნდა */}
                          <View style={styles.freeCancelation}>
                            <View style={styles.freeCancelationView}>
                              <AntDesign
                                name="check"
                                size={20}
                                color="#208e17"
                              />
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
                          onPress={() => navigateToRoom(hotelInfo.id, room.id)}
                          activeOpacity={1}
                          style={styles.amenitiesBtn}
                        >
                          <Text style={styles.amenitiesBtnText}>
                            See details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <Text>Loading...</Text>
                )}
              </TouchableOpacity>
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
      </GestureHandlerRootView>
      <View style={styles.showBtnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.showBtnActive}
          onPress={() => navigateToRooms(hotelInfo)}
        >
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

export default HotelPage;

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
  cardContentFirstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
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
  cardContentSecondSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  SecondSectionText: {
    color: "#9D9D9D",
    fontWeight: "500",
    fontSize: 16,
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
  languagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  languages: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    paddingTop: 5,
    width: 107,
    height: 32,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  languagesText: {
    paddingBottom: 5,
  },

  map: {
    width: 328,
    height: 272,
    marginHorizontal: "auto",
    marginVertical: 25,
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
  disabled: {
    color: "#EDEDED",
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
  roomImage: {
    width: 328,
    height: 196,
    resizeMode: "cover",
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
