import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyles from "../styles/global";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import SearchResults from "./SearchResults";
import SearchPageDrawer from "./SearchPageDrawer";
import SearchPageTags from "./SearchPageTags";
import Destinations from "./Destinations";
import SearchSuggestionsCollapse from "./SearchSuggestionCollapse";

const SearchSuggestions = () => {
  const { searchQuery } = useGlobalState();
  return (
    <View style={styles.SearchSuggestions}>
      <SearchSuggestionsCollapse />
    </View>
  );
};

export default SearchSuggestions;

const styles = StyleSheet.create({
  SearchSuggestions: {
    position: "absolute",
    top: 65,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f5",
    padding: 10,
    height: 243,
  },
});
