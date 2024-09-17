import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Link, useRouter } from "expo-router";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import { TextInput } from "react-native-gesture-handler";
import SearchSuggestions from "./SearchSuggestions";

const Search = ({ setToggleCalendar }) => {
  const {
    handleOpenCalendarDrawer,
    startDate,
    endDate,
    searchText,
    setSearchText,
    searchQuery,
    setSearchQuery,
    setSuggestions,
    Suggestions,
    handleOpenBottomSheet,
    countAdults,
    countChildren,
    formattedToday,
    formattedTomorrow,
    hotelList,
    search,
    formattedStartDate,
    formattedEndDate,

    countDrawer,
  } = useGlobalState();

  function clearSearchText() {
    setSearchText("");
    setSuggestions("");
  }

  function searchTextHandler(text: string) {
    setSearchText(text);
    setSearchQuery(text);
    setSuggestions(text);
  }

  const router = useRouter();

  const navigateToSearch = () => {
    router.push("/ui/SearchResultsPage ");
  };
  const handleNavigate = () => {
    router.push("/ui/SearchFilters");
  };

  function handleSubmitEditing() {
    setSuggestions("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <View style={styles.inputWrapper}>
          <AntDesign name="search1" size={24} style={{ paddingRight: 10 }} />
          <TextInput
            style={styles.searchTextInput}
            value={searchText}
            onChangeText={searchTextHandler}
            placeholder={searchText ? searchText : "Enter your destination"}
            onSubmitEditing={handleSubmitEditing}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setToggleCalendar(1);
          handleOpenCalendarDrawer();
        }}
        activeOpacity={1}
        style={styles.formInput}
      >
        <AntDesign style={styles.inputIcon} name="calendar" size={24} />
        <Text style={styles.input}>
          {startDate && endDate ? (
            <Text style={styles.infoText}>
              {formattedStartDate} to {formattedEndDate}
            </Text>
          ) : (
            `${formattedToday} - ${formattedTomorrow}`
          )}
        </Text>
      </TouchableOpacity>
      <View style={styles.formInput}>
        <AntDesign style={styles.inputIcon} name="user" size={24} />
        <TouchableOpacity
          onPress={() => {
            setToggleCalendar(0);
            handleOpenCalendarDrawer();
          }}
        >
          <Text
            style={styles.input}
          >{`${countAdults} Adults, ${countChildren} Children`}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToSearch}>
        <Text style={styles.formButton}>Search</Text>
      </TouchableOpacity>
      {Suggestions.length > 2 && <SearchSuggestions />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 45,
  },

  formInput: {
    height: 60,
    marginBottom: 10,
    paddingLeft: 15,
    backgroundColor: "#f5f5f5",
  },
  inputWrapper: {
    marginVertical: 20,
    flexDirection: "row",
  },

  input: {
    height: "100%",
    marginLeft: 36,
  },
  inputIcon: {
    width: 26,
    top: 22,
  },
  formButton: {
    width: "100%",
    margin: "auto",
    color: "white",
    backgroundColor: "#1d2123",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 15,
    marginTop: 25,
    textAlign: "center",
    borderRadius: 4,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
  searchTextInput: {
    width: "100%",
  },
});
