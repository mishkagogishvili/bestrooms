import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useRef, useState } from "react";

import { useGlobalState } from "@/components/context/GlobalStateProvider";
import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import StarRating from "../ui/StarRating";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const SearchPageDrawer = () => {
  const {
    searchQuery,
    db,
    setDb,
    toggleFavorite,
    updateRating,
    searchResult,
    setHotelId,
  } = useGlobalState();

  const bottomSheetRef = useRef(null);

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const snapPoints = ["13%", "60%"];

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const [userRating, setUserRating] = useState(db.rating);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );
  const router = useRouter();

  const navigateToDetail = (item) => {
    router.push(`/ui/HotelPage/?id=${item.id}`);
    setHotelId(item.id);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1} // Initially closed
      snapPoints={snapPoints}
      enablePanDownToClose={false}
    >
      <BottomSheetScrollView>
        <View>
          <Text style={styles.searchPageBottomSheetHeader}>
            Explore 300+ Places
          </Text>

          <View>
            {searchResult.data.map((item) => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => navigateToDetail(item)}
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
                        <View style={styles.cardContentFirstSection}>
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
                              {/* ({item.reviews} reviews) */} (3)
                            </Text>
                          </View>
                          <TouchableOpacity activeOpacity={1}>
                            <StarRating
                              defaultRating={item.star_rating}
                              onSetRating={setUserRating}
                            />
                          </TouchableOpacity>
                        </View>
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
                            <Text style={styles.price}>$555</Text>
                            <Text style={styles.night}> / night</Text>
                          </View>
                        </View>
                        <View style={styles.horizontalLine}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default SearchPageDrawer;

const styles = StyleSheet.create({
  searchPageBottomSheetHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 25,
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
    bottom: 140,
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
  cardHeartUnselected: {
    position: "absolute",
    zIndex: 2,
    bottom: 140,
    right: 10,
    height: 40,
    width: 40,
    backgroundColor: "#2126284d",
    borderRadius: 3,
    textAlign: "center",
    cursor: "pointer",
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
    width: 90,
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
});
