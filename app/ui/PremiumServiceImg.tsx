import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import AntDesign from "@expo/vector-icons/AntDesign";
import RoomImages from "./RoomImages";
import PremiumServiceImages from "./PremiumServiceImages";

const PremiumServiceImg = () => {
  const { premiumService } = useGlobalState();

  const countImages = premiumService.images.length;

  const roomImages = premiumService.images;

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "premium service images",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Text style={styles.resetFilters}>{countImages}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      {premiumService && premiumService.images ? (
        <ScrollView>
          <PremiumServiceImages roomImages={roomImages} />
        </ScrollView>
      ) : (
        <Text>loading...</Text>
      )}
    </GestureHandlerRootView>
  );
};

export default PremiumServiceImg;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 20,
    marginHorizontal: "auto",
  },
  resetFilters: {
    color: "#C4C4C4",
  },
  backBtn: {
    marginHorizontal: 20,
    width: 48,
    height: 48,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 12,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  tagsWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tagsBtn: {
    width: 90,
    height: 35,
    borderRadius: 3,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 5,
    cursor: "pointer",
    marginRight: 10,
  },
  tagsBtnActive: {
    width: 90,
    height: 35,
    borderRadius: 3,
    backgroundColor: "#212628",
    alignItems: "center",
    paddingTop: 5,
    cursor: "pointer",
    marginRight: 10,
  },
  white: {
    color: "white",
    fontSize: 14,
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
