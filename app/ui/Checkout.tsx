import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

import AntDesign from "@expo/vector-icons/AntDesign";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Checkout = () => {
  const {
    db,
    search,
    hotelInfo,
    checkout,
    setCheckout,
    handlePress,
    data,
    correctName,
    setCorrectName,
    correctLastName,
    setCorrectLastName,
    correctEmail,
    setCorrectEmail,
    correctPhoneNumber,
    setCorrectPhoneNumber,
    nameValidation,
    lastNameValidation,
    emailValidation,
    phoneValidation,
  } = useGlobalState();

  const { id } = useGlobalSearchParams();
  const navigation = useNavigation();
  const item = db.find((item) => item.id === parseInt(id, 10));

  const scrollViewRef = useRef(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  function errorValidation() {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment summary",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Text style={styles.bold}>Edit</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          <View>
            <Text style={styles.bold}>User details</Text>
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="user"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={checkout.name}
                onChangeText={(text) => {
                  setCheckout({ ...checkout, name: text });
                  nameValidation(text);
                }}
              />
            </View>
            {!correctName && (
              <Text style={{ color: "#E63939", marginLeft: 10 }}>
                incorrect character (only include letters)
              </Text>
            )}
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="user"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                value={checkout.last_name}
                onChangeText={(text) => {
                  setCheckout({ ...checkout, last_name: text });
                  lastNameValidation(text);
                }}
              />
            </View>
            {!correctLastName && (
              <Text style={{ color: "#E63939", marginLeft: 10 }}>
                incorrect character (only include letters)
              </Text>
            )}

            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="mail"
                size={24}
                color="black"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={checkout.email}
                onChangeText={(text) => {
                  setCheckout({ ...checkout, email: text });
                  emailValidation(text);
                }}
              />
            </View>
            {!correctEmail && (
              <Text style={{ color: "#E63939", marginLeft: 10 }}>
                please enter valid email
              </Text>
            )}
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="mobile1"
                size={24}
                color="black"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={checkout.mobile}
                onChangeText={(text) => {
                  setCheckout({ ...checkout, mobile: text });
                  phoneValidation(text);
                }}
              />
            </View>
            {!correctPhoneNumber && (
              <Text style={{ color: "#E63939", marginLeft: 10 }}>
                incorrect character (only include numbers)
              </Text>
            )}
            <View>
              <TextInput
                style={styles.textarea}
                placeholder="Enter your message here"
                placeholderTextColor="#888"
                multiline={true}
                numberOfLines={4}
                value={checkout.custom_text}
                onChangeText={(text) =>
                  setCheckout({ ...checkout, custom_text: text })
                }
              />
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={{ marginVertical: 35 }}>
            <View style={{ flexDirection: "row" }}>
              {/* <Image
                source={require("../../assets/images/profilePicture.png")}
              /> */}
              <Text style={styles.authorDetails}>Hosted By jolyne kujoh</Text>
            </View>
            <View style={styles.authordetailes}>
              <Text style={{ fontWeight: "500" }}>{hotelInfo.phone}</Text>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <AntDesign name="copy1" size={20} color="#9d9d9d" />
                <Text style={{ marginLeft: 10, fontWeight: "500" }}>copy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.authordetailes}>
              <Text style={{ fontWeight: "500" }}>{hotelInfo.email}</Text>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <AntDesign name="copy1" size={20} color="#9d9d9d" />
                <Text style={{ marginLeft: 10, fontWeight: "500" }}>copy</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.activityScheduleWrapper}>
            <View style={styles.activityScheduleHeader}>
              <Text>Check in & Check out dates</Text>
              <Text>(14 days)</Text>
            </View>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="calendar" size={24} color="black" />
                <Text style={styles.activityScheduleName}>
                  {search[0].check_in}
                </Text>
              </View>
            </View>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <AntDesign name="calendar" size={24} color="black" />
                <Text style={styles.activityScheduleName}>
                  {search[0].check_out}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.activityScheduleWrapper}>
            <Text>Room information</Text>
            <View style={styles.bookingStatusWrapper}>
              <View style={styles.activityScheduleNameWrapper}>
                <FontAwesome6 name="bed" size={24} color="black" />
                <Text style={styles.activityScheduleName}>
                  {search[0].adults} adults, {search[0].children} child
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.bold}>Price details</Text>
            <View style={styles.activityScheduleHeader}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>$25</Text>
                <Text style={{ color: "#9D9D9D" }}> x 15 nights</Text>
              </View>
              <Text style={{ fontWeight: "bold" }}>$2500</Text>
            </View>
            <View style={styles.activityScheduleHeader}>
              <Text>Hike in the mountains</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>$55</Text>
                <AntDesign name="delete" size={20} color="#9d9d9d" />
              </View>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.activityScheduleHeader}>
              <Text style={styles.bold}>Sub total: </Text>
              <Text style={{ fontWeight: "bold" }}>$2555</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.reserveBtn}
          onPress={() => {
            {
              correctName &&
              correctLastName &&
              correctEmail &&
              correctPhoneNumber
                ? handlePress()
                : errorValidation();
            }
          }}
        >
          <Text style={{ color: "white" }}>Confirm and pay</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white" }}>$2555 </Text>
            <Text style={{ color: "#9D9D9D" }}>/ total</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  errorMessage: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
  },
  errorMessageText: {
    fontSize: 18,
    textAlign: "center",
    color: "#E63939",
  },
  backBtn: {
    marginHorizontal: 20,
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 12,
  },
  container: {
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: 35,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  textarea: {
    height: 80,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
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
  bookingStatusWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 4,
    padding: 12,
    marginTop: 15,
  },
  bookingStatusName: {
    color: "#9D9D9D",
  },
  activityScheduleWrapper: {
    marginVertical: 20,
  },
  activityScheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },
  activityScheduleNameWrapper: {
    flexDirection: "row",
  },
  activityScheduleName: {
    color: "#9D9D9D",
    marginLeft: 10,
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
});
