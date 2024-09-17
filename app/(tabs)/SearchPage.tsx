import { StyleSheet, View } from "react-native";
import React from "react";
import SearchPageHeader from "../ui/SearchPageHeader";
import SearchPageTags from "../ui/SearchPageTags";
import Destinations from "../ui/Destinations";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchResults from "../ui/SearchResults";
import SearchPageDrawer from "../ui/SearchPageDrawer";

const searchPage = () => {
  const { searchQuery, db, setDb, toggleFavorite, updateRating } =
    useGlobalState();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <SearchPageHeader />
        {!searchQuery && <SearchPageTags />}
        {!searchQuery && <Destinations />}
      </View>
      {searchQuery && <SearchResults />}
      {searchQuery && <SearchPageDrawer />}
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
