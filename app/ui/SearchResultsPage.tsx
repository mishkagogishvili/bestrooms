import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import SearchPageHeader from "../ui/SearchPageHeader";
import SearchPageTags from "../ui/SearchPageTags";
import Destinations from "../ui/Destinations";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchResults from "../ui/SearchResults";
import SearchPageDrawer from "../ui/SearchPageDrawer";
import { useNavigation } from "expo-router";

const searchPage = () => {
  const {
    searchQuery,
    db,
    setDb,
    toggleFavorite,
    updateRating,
    searchResult,
    search,
  } = useGlobalState();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <SearchPageHeader />
      </View>
      <SearchResults />
      <SearchPageDrawer />
    </GestureHandlerRootView>
  );
};

export default searchPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
});
