import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

const SearchSuggestionsCollapse = () => {
  const {
    db,
    searchText,
    setSearchText,
    setSearchQuery,
    searchQuery,
    setSuggestions,
    hotelList,
    handleOpenCalendarDrawer,
  } = useGlobalState();

  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const searchFilter = () => {
      if (!searchText) {
        setFilteredHotels(hotelList);
        return;
      }

      const lowercasedSearchText = searchText.toLowerCase();

      const filtered = hotelList.filter((hotel) => {
        const keywordsMatch = hotel.keywords
          .toLowerCase()
          .includes(lowercasedSearchText);
        const cityMatch = hotel.city
          ?.toLowerCase()
          .includes(lowercasedSearchText);
        const regionMatch = hotel.region
          ?.toLowerCase()
          .includes(lowercasedSearchText);
        const countryMatch = hotel.country
          ?.toLowerCase()
          .includes(lowercasedSearchText);
        const titleMatch = hotel.translations[0]?.title
          .toLowerCase()
          .includes(lowercasedSearchText);

        return (
          keywordsMatch ||
          cityMatch ||
          regionMatch ||
          countryMatch ||
          titleMatch
        );
      });

      setFilteredHotels(filtered);
    };

    searchFilter();
  }, [hotelList]);

  function searchTextHandler(country, city, region, title) {
    Keyboard.dismiss();
    let titleName = "";

    if (title) {
      titleName = title.translations
        .map((translation) => translation.title)
        .join(", ");
    }

    const destinationText =
      country.country || city.city || region.region || titleName;
    setSearchQuery(destinationText);
    setSearchText(destinationText);
    setSuggestions("");
  }

  console.log(filteredHotels);

  return (
    <View style={styles.container}>
      <View>
        {filteredHotels.length > 0 ? (
          <>
            {filteredHotels.map((item) => (
              <>
                <TouchableOpacity
                  key={item.id}
                  style={styles.destinationsWrapper}
                  onPress={() => searchTextHandler("", "", "", item)}
                >
                  <View style={styles.destinationsIcon}>
                    <FontAwesome6 name="bed" size={24} color="black" />
                  </View>
                  <View style={styles.destinationsContent}>
                    <Text style={styles.destinationsHotelName}>
                      {item.translations.map(
                        (translation) => translation.title
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  key={item.id}
                  style={styles.destinationsWrapper}
                  onPress={() => searchTextHandler("", item, "", "")}
                >
                  <AntDesign
                    style={styles.destinationsIcon}
                    name="enviromento"
                    size={30}
                  />
                  <View style={styles.destinationsContent}>
                    <Text style={styles.destinationsHotelName}>
                      {item.city}, {item.region} Region, {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            ))}
          </>
        ) : (
          <Text style={{ marginTop: 30, fontWeight: "bold" }}>
            No Results...
          </Text>
        )}
      </View>
    </View>
  );
};

export default SearchSuggestionsCollapse;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
  },
  destinationsWrapper: {
    flexDirection: "row",
    marginTop: 10,
    zIndex: 100,
  },
  destinationsContent: {
    marginVertical: 16,
    marginLeft: 15,
    cursor: "pointer",
  },
  destinationsIcon: {
    marginTop: 25,
  },
  destinationsCity: {
    margin: 0,
    marginBottom: 5,
  },
  destinationsRegion: {
    margin: 0,
    marginBottom: 5,
  },
  destinationsHotelName: {
    margin: 0,
    marginTop: 6,
    paddingTop: 8,
  },
});
