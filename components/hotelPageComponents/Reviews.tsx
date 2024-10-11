import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGlobalState } from "../context/GlobalStateProvider";
import StarRating from "@/app/ui/StarRating";
import { Progress } from "@ant-design/react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

const Reviews = () => {
  const { hotelInfo } = useGlobalState();

  const percent5 = 68;
  const percent4 = 28;
  const percent3 = 4;
  const percent2 = 0;
  const percent1 = 0;
  return (
    <>
      <View style={styles.horizontalLine}></View>
      <View>
        <View style={styles.flex}>
          <View style={styles.singleStarWrapper}>
            <Text>Hotel reviews</Text>
            <Text style={styles.review}>
              ({hotelInfo.hotel.reviews} reviews)
            </Text>
            <Text style={styles.review}>(0 reviews)</Text>
          </View>
          <View style={styles.starRatingWrapper}>
            <StarRating defaultRating={hotelInfo.hotel.star_rating} />
          </View>
          <Text style={styles.rating}>{hotelInfo.hotel.star_rating}</Text>
        </View>
        <View>
          <View style={styles.pointsWrapper}>
            <Text style={[styles.pointsText, percent5 < 1 && styles.disabled]}>
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
            <Text style={[styles.pointsText, percent4 < 1 && styles.disabled]}>
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
            <Text style={[styles.pointsText, percent3 < 1 && styles.disabled]}>
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
            <Text style={[styles.pointsText, percent2 < 1 && styles.disabled]}>
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
            <Text style={[styles.pointsText, percent1 < 1 && styles.disabled]}>
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
                  <Text style={{ fontWeight: "500" }}>Levan Sanadiradzde</Text>
                  <Text style={{ color: "#9D9D9D" }}>April 2021</Text>
                </View>
              </View>
              <Text style={styles.text}>5.0</Text>
            </View>
            <Text style={styles.userReview}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempora incididunt ut labore et dolore.
            </Text>
          </View>
          <View style={{ marginBottom: 25 }}>
            <View style={styles.profileDetailesWrapper}>
              <View style={styles.profileDetailes}>
                <AntDesign name="user" size={28} color="black" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "500" }}>Nodar popkhadze</Text>
                  <Text style={{ color: "#9D9D9D" }}>April 2021</Text>
                </View>
              </View>
              <Text style={styles.text}>4.0</Text>
            </View>
            <Text style={styles.userReview}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempora incididunt ut labore et dolore magna das aliqua.
              Ut enim ad minim veniam.
            </Text>
          </View>
          <View style={{ marginBottom: 25 }}>
            <View style={styles.profileDetailesWrapper}>
              <View style={styles.profileDetailes}>
                <AntDesign name="user" size={28} color="black" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "500" }}>Giorgi birkadze</Text>
                  <Text style={{ color: "#9D9D9D" }}>April 2021</Text>
                </View>
              </View>
              <Text style={styles.text}>5.0</Text>
            </View>
            <Text style={styles.userReview}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempora incididunt ut labore et dolore magna.
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.amenitiesBtn}>
          <Text style={styles.amenitiesBtnText}>View all reviews (34)</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },
  flex: {
    flexDirection: "row",
    marginVertical: 15,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
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
});
