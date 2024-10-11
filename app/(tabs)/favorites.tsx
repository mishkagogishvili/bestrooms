import React, { useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";

import { useGlobalState } from "../../components/context/GlobalStateProvider";
import { useRouter } from "expo-router";
import StarRating from "../ui/StarRating";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const favorites = () => {
  const {
    hotelList,
    setHotelId,
    toggleFavorite,
    updateRating,
    userRating,
    setUserRating,
    changeCurrency,
  } = useGlobalState();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const router = useRouter();
  const navigateToDetail = (item, id) => {
    router.push(`/ui/HotelPage/?id=${item.id}`);
    setHotelId(id);
  };

  const opacity = useRef(new Animated.Value(0)).current;

  const removeNotificationFunction = () => {
    setNotificationVisible(true);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setNotificationVisible(false));
    }, 2000);
  };

  return (
    <>
      <View style={styles.favoritesHeader}>
        <Text>Your favorite picks</Text>
        {/* <Text style={styles.favoriteHotelCount}>{countFavorites} Hotels</Text> */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {hotelList && hotelList.hotels && hotelList.hotels.data ? (
            hotelList.hotels.data.map((item) => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => navigateToDetail(item, item.id)}
                    activeOpacity={1}
                    style={styles.favoritesCardBodyWrapper}
                  >
                    <View style={styles.favoritesCardBody}>
                      <Image
                        source={{ uri: item.images[0].url }}
                        style={styles.favoritesCardImage}
                      />
                      <TouchableOpacity
                        style={styles.cardHeart}
                        onPress={() => {
                          toggleFavorite(item.id);
                          removeNotificationFunction();
                        }}
                      >
                        <AntDesign
                          style={styles.heartIcon}
                          name="heart"
                          size={24}
                          color="#FF0000"
                        />
                      </TouchableOpacity>
                      <View style={styles.onMap}>
                        <AntDesign
                          style={styles.locationDot}
                          name="enviromento"
                          size={16}
                          color="black"
                        />

                        <Text>on map</Text>
                      </View>
                      {/* {item.discount > 0 && (
              <View style={styles.cardDiscount}>
                <Text style={styles.cardDiscountText}>
                  -{item.discount}%
                </Text>
              </View>
            )} */}
                      <View style={styles.favoritesCardImage}>
                        <Text style={styles.cardName}>
                          {item.translations[0].title}
                        </Text>
                        {/* <View style={styles.cardContentFirstSection}>
                          <View style={styles.singleStarWtapper}>
                            <FontAwesome
                              name="star-half-empty"
                              size={24}
                              color="#ffd363"
                            />
                            <Text style={styles.rating}>
                              {item.star_rating}
                            </Text>
                            <Text style={styles.review}>
                              ({item.reviews} reviews) (3)
                            </Text>
                          </View>
                          <TouchableOpacity activeOpacity={1}>
                            <StarRating
                              defaultRating={item.star_rating}
                              onSetRating={setUserRating}
                            />
                          </TouchableOpacity>
                        </View> */}
                        <View style={styles.cardContentSecondSection}>
                          {/* {item.cancelation && ( */}
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
                          {/* )} */}
                          <View style={styles.priceNightWrapper}>
                            {/* <Text style={styles.price}>${item.price}</Text> */}
                            <Text style={styles.price}>
                              {" "}
                              {changeCurrency === "usd" ? "$" : "₾"}
                              {item.min_price}
                            </Text>
                            <Text style={styles.night}> / night</Text>
                          </View>
                        </View>
                        <View style={styles.horizontalLine}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
      <View
        style={[
          styles.removeNotification,
          notificationVisible && { opacity: 1 },
        ]}
      >
        <Text style={{ color: "white" }}>Hotel removed</Text>
        <TouchableOpacity activeOpacity={1}>
          <Text style={{ color: "#98AAF7" }}>Undo</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default favorites;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
  },
  favoritesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 65,
    width: "80%",
    marginHorizontal: "auto",
  },
  favoriteHotelCount: {
    color: "#c4c4c4",
  },
  favoritesCardBodyWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    cursor: "pointer",
  },
  favoritesCardBody: {
    position: "relative",
    marginTop: 40,
  },
  favoritesCardImage: {
    width: 328,
    height: 196,
    borderRadius: 4,
  },
  cardHeart: {
    position: "absolute",
    zIndex: 2,
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 3,
    textAlign: "center",
    cursor: "pointer",
  },
  heartIcon: {
    paddingTop: 8,
    paddingLeft: 8,
    color: "#f05353",
  },
  onMap: {
    position: "absolute",
    zIndex: 2,
    width: 83,
    height: 32,
    top: 145,
    right: 10,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    cursor: "pointer",
    backgroundColor: "white",
    flexDirection: "row",
  },
  locationDot: {
    marginTop: 2,
    marginRight: 3,
  },
  cardDiscount: {
    position: "absolute",
    zIndex: 2,
    top: 12,
    width: 69,
    height: 32,
    backgroundColor: "#ffd363",
  },
  cardDiscountText: {
    margin: 0,
    paddingTop: 6,
    paddingLeft: 15,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 4,
    marginTop: 15,
  },
  cardContentFirstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  singleStarWtapper: {
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
    marginTop: 25,
  },
  freeCancelation: {
    flexDirection: "row",
    color: "#208e17",
    backgroundColor: "#e7f5e6",
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
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  removeNotification: {
    width: "80%",
    height: 48,
    backgroundColor: "#212628",
    textAlign: "center",
    marginHorizontal: "auto",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 12,
    opacity: 0,
  },
});
