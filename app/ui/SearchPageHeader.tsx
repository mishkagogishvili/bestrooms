import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useRouter } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const SearchPageHeader = () => {
  const { searchText, setSearchText, searchQuery, setSearchQuery } =
    useGlobalState();

  const router = useRouter();

  const handleNavigate = () => {
    router.push("/ui/SearchFilters");
  };

  useEffect(() => {
    if (searchQuery !== searchText) {
      setSearchQuery("");
    }
  }, [searchText]);

  useEffect(() => {
    if (searchQuery !== searchText) {
      setSearchText(searchQuery);
    }
  }, [searchQuery]);

  const navigation = useNavigation();

  function navigationHandler() {
    navigation.goBack();
    setSearchQuery("");
  }

  function clearSearchText() {
    setSearchText("");
  }

  return (
    <View style={styles.searchPageHeader}>
      <View style={styles.searchPageBackBtn}>
        <TouchableOpacity onPress={() => navigationHandler()}>
          <AntDesign name="left" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchPageInputWrapper}>
        <AntDesign name="search1" size={24} style={styles.icon} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder={searchText ? searchText : "Enter your destination"}
          style={styles.search}
        />
        {!searchQuery ? (
          <TouchableOpacity
            onPress={clearSearchText}
            style={styles.searchPageInputCloseBtn}
          >
            <AntDesign name="close" size={26} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleNavigate}
            style={styles.searchPageInputCloseBtn}
          >
            <Feather name="sliders" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchPageHeader;

const styles = StyleSheet.create({
  searchPageHeader: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
  },
  searchPageBackBtn: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    textAlign: "center",
    paddingLeft: 13,
    marginRight: 15,
    paddingTop: 10,
    cursor: "pointer",
  },
  searchPageInputWrapper: {
    width: 272,
    height: 48,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  icon: {
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  search: {
    flex: 1,
    marginTop: -10,
  },
  searchPageInputCloseBtn: {
    cursor: "pointer",
    paddingBottom: 5,
    marginRight: 10,
  },
});
