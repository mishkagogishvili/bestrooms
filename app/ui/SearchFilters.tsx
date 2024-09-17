import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import RangeSlider from "@/components/RangeSlider";
import { Provider, Modal, Checkbox, List } from "@ant-design/react-native";
import RecommendedRadioBtn from "./RecommendedRadioBtn";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const SearchFilters = () => {
  const {
    recommendedVisible,
    setRecommendedVisible,
    backAlertVisible,
    setBackAlertVisible,
  } = useGlobalState();
  const navigation = useNavigation();

  const recommendedOnClose = () => {
    setRecommendedVisible(false);
  };
  const backBtnOnClose = () => {
    setBackAlertVisible(false);
  };
  const handleBackButtonPress = () => {
    setBackAlertVisible(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
    setBackAlertVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Filters",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Text style={styles.resetFilters}>Reset filters</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={styles.backBtn}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <Provider>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text>Sort By</Text>
              <TouchableOpacity
                onPress={() => setRecommendedVisible(true)}
                style={styles.sortOptions}
                activeOpacity={1}
              >
                <Text>Recommended</Text>
                <AntDesign name="down" size={24} color="black" />
              </TouchableOpacity>
              <Modal
                title=""
                transparent
                onClose={recommendedOnClose}
                maskClosable
                visible={recommendedVisible}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={recommendedOnClose}
                  style={styles.ChangeLanguageHeader}
                >
                  <Text>Change Language</Text>
                  <AntDesign name="up" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ paddingVertical: 20 }}>
                  <RecommendedRadioBtn />
                </View>
              </Modal>
              <Modal
                title=""
                transparent
                onClose={backBtnOnClose}
                maskClosable
                visible={backAlertVisible}
              >
                <View style={styles.ChangeLanguageHeader}>
                  <Text style={styles.backBtnQuestionHeader}>
                    Sure you want to go back?
                  </Text>
                </View>
                <View style={{ paddingVertical: 20 }}>
                  <Text>
                    Going back will not apply filters and they will be lost. In
                    order to proceed with your filters, click the Show Results
                    button.
                  </Text>
                  <View style={styles.backBtnQuestions}>
                    <TouchableOpacity
                      onPress={handleGoBack}
                      activeOpacity={1}
                      style={styles.gotIt}
                    >
                      <Text>Got it</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={backBtnOnClose}
                      activeOpacity={1}
                      style={styles.showResults}
                    >
                      <Text style={styles.showResultsText}>Show Results</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.segmentWrapper}>
              <Text>Price range</Text>
              <RangeSlider />
            </View>
            <View style={styles.segmentWrapper}>
              <Text>User Rating</Text>
              <View style={styles.ratingWrapper}>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <FontAwesome6
                    name="circle-half-stroke"
                    size={18}
                    color="#FFD363"
                  />
                  <Text style={styles.ratingNumberText}>2.0+</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <FontAwesome6
                    name="circle-half-stroke"
                    size={18}
                    color="#FFD363"
                  />
                  <Text style={styles.ratingNumberText}>3.0+</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <FontAwesome6
                    name="circle-half-stroke"
                    size={18}
                    color="#FFD363"
                  />
                  <Text style={styles.ratingNumberText}>4.0+</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <FontAwesome6
                    name="circle-half-stroke"
                    size={18}
                    color="#FFD363"
                  />
                  <Text style={styles.ratingNumberText}>5.0</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.noRating}>
                  <Text>No rating</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingAll}>
                  <Text style={styles.ratingText}>All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.segmentWrapper}>
              <Text>Hotel class</Text>
              <View style={styles.ratingWrapper}>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <AntDesign name="star" size={18} color="#FFD363" />
                  <Text style={styles.ratingNumberText}>2+</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <AntDesign name="star" size={18} color="#FFD363" />
                  <Text style={styles.ratingNumberText}>3+</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <AntDesign name="star" size={18} color="#FFD363" />
                  <Text style={styles.ratingNumberText}>4+</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingNumber}>
                  <AntDesign name="star" size={18} color="#FFD363" />
                  <Text style={styles.ratingNumberText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.noRating}>
                  <Text>No rating</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.ratingAll}>
                  <Text style={styles.ratingText}>All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.segmentWrapper}>
              <Text>Amenities</Text>
              <View>
                <List style={styles.amenitiesWrapper}>
                  <List.Item
                    style={styles.amenities}
                    thumb={<Checkbox>Parking</Checkbox>}
                  />
                  <List.Item
                    style={styles.amenities}
                    thumb={<Checkbox>Fitness</Checkbox>}
                  />
                  <List.Item
                    style={styles.amenities}
                    thumb={<Checkbox>Restaurant</Checkbox>}
                  />
                  <List.Item
                    style={styles.amenities}
                    thumb={<Checkbox>Breakfast</Checkbox>}
                  />
                  <List.Item
                    style={styles.amenities}
                    thumb={<Checkbox>24 Hour Service</Checkbox>}
                  />
                  <List.Item
                    style={styles.amenities}
                    thumb={<Checkbox>Air Conditioner</Checkbox>}
                  />
                </List>
              </View>
            </View>
          </View>
        </ScrollView>
      </Provider>
      <View style={styles.showBtnWrapper}>
        <TouchableOpacity activeOpacity={1} style={styles.showBtnActive}>
          <Text style={styles.showBtnText}>Show results</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchFilters;

const styles = StyleSheet.create({
  backBtn: {
    marginHorizontal: 20,
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 12,
  },
  backBtnQuestionHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backBtnQuestions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 25,
  },
  gotIt: {
    width: 85,
    height: 40,
    borderRadius: 4,
    backgroundColor: "transparent",
    paddingTop: 8,
    alignItems: "center",
  },
  showResults: {
    width: 138,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#212628",
    paddingTop: 8,
    alignItems: "center",
  },
  showResultsText: {
    color: "white",
  },
  resetFilters: {
    color: "#C4C4C4",
  },
  container: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 50,
    marginBottom: 50,
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 328,
    height: 48,
    borderRadius: 4,
    padding: 12,
    marginTop: 10,
    backgroundColor: "#F5F5F5",
  },
  segmentWrapper: {
    marginTop: 25,
  },

  ratingWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },

  ratingNumber: {
    margin: 2,
    flexDirection: "row",
    justifyContent: "center",
    width: 99,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  ratingNumberText: {
    marginLeft: 10,
  },
  noRating: {
    margin: 2,
    width: 110,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  ratingAll: {
    margin: 2,
    width: 65,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  ratingText: {
    color: "black",
  },
  amenitiesWrapper: {
    backgroundColor: "transparent",
  },
  amenities: {
    marginVertical: 7,
    backgroundColor: "transparent",
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
    width: 328,
    height: 48,
    borderRadius: 4,
    backgroundColor: "#212628",
    alignItems: "center",
    paddingTop: 12,
  },
  ChangeLanguageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
