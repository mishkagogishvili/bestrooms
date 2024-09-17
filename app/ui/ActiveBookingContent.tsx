import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useRouter } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";

const ActiveBookingContent = () => {
  const { db, toggleFavorite, handleHeartClick } = useGlobalState();

  const imageMapping = {
    "../../assets/images/1.jpeg": require("../../assets/images/1.jpeg"),
    "../../assets/images/2.jpeg": require("../../assets/images/2.jpeg"),
    "../../assets/images/3.jpeg": require("../../assets/images/3.jpeg"),
  };

  const router = useRouter();

  const bookedItems = db.filter((item) => item.booked);

  const navigateToDetail = (item) => {
    router.push(`/bookingDetails?id=${item.id}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        {db.map(
          (item) =>
            item.booked && (
              <View key={item.id}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigateToDetail(item)}
                  style={styles.favoritesCardBodyWrapper}
                >
                  <View style={styles.favoritesCardBody}>
                    <Image
                      source={imageMapping[item.image]}
                      style={styles.favoritesCardImage}
                    />
                    <TouchableOpacity
                      activeOpacity={1}
                      style={
                        item.isFavorite
                          ? styles.cardHeart
                          : styles.cardHeartUnselected
                      }
                      onPress={() => {
                        toggleFavorite(item.id);
                      }}
                    >
                      {item.isFavorite ? (
                        <AntDesign
                          style={styles.heartIcon}
                          name="heart"
                          size={24}
                          color="#FF0000"
                        />
                      ) : (
                        <AntDesign
                          style={styles.heartIconUnselected}
                          name="hearto"
                          size={24}
                          color="white"
                        />
                      )}
                    </TouchableOpacity>
                    <View style={styles.onMap}>
                      <AntDesign
                        name="enviromento"
                        style={styles.locationDot}
                        size={16}
                        color="black"
                      />

                      <Text>on map</Text>
                    </View>
                    {item.discount > 0 && (
                      <View style={styles.cardDiscount}>
                        <Text style={styles.cardDiscountText}>
                          -{item.discount}%
                        </Text>
                      </View>
                    )}
                    <View style={styles.favoritesCardImage}>
                      <Text style={styles.cardName}>{item.name}</Text>
                      <View style={styles.checkInWrapper}>
                        <View style={styles.checkInDates}>
                          <Text style={styles.checkInDatesText}>
                            Check In:&nbsp;
                          </Text>
                          <Text style={styles.checkInDatesText}>
                            22th May, 2022
                          </Text>
                        </View>
                        <View style={styles.checkInDates}>
                          <Text style={styles.checkInDatesText}>
                            Check Out:&nbsp;
                          </Text>
                          <Text style={styles.checkInDatesText}>
                            26th May, 2022
                          </Text>
                        </View>
                      </View>
                      <View style={styles.cardContentSecondSection}>
                        {item.cancelation && (
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
                        )}
                        <View style={styles.priceNightWrapper}>
                          <Text style={styles.night}>Total: </Text>
                          <Text style={styles.price}>${item.price}</Text>
                        </View>
                      </View>
                      <View style={styles.horizontalLine}></View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
        )}
      </View>
    </ScrollView>
  );
};

export default ActiveBookingContent;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
  },
  favoritesCardBodyWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: 25,
  },
  favoritesCardBody: { position: "relative" },
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
  cardHeartUnselected: {
    position: "absolute",
    zIndex: 2,
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    backgroundColor: "#2126284d",
    borderRadius: 3,
    textAlign: "center",
    cursor: "pointer",
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
    color: "#212628",
    marginTop: 15,
  },
  checkInWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkInDates: {
    flexDirection: "row",
    marginTop: 10,
  },
  checkInDatesText: {
    color: "#c4c4c4",
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
});
