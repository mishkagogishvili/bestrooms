import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

const Destinations = () => {
  const { db, searchText, setSearchText, setSearchQuery, searchQuery } =
    useGlobalState();

  const filteredResults = db
    .filter((item) =>
      item.city.toLowerCase().includes(searchText.toLowerCase())
    )
    .reduce((acc, current) => {
      const x = acc.find((item) => item.city === current.city);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  function createSearchQuery(searchTerm) {
    setSearchQuery(searchTerm);
  }

  return (
    <View style={styles.container}>
      {!searchText ? (
        <View>
          {filteredResults.map(
            (item) =>
              item.city.toLowerCase().includes(searchText.toLowerCase()) && (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => createSearchQuery(item.city)}
                    activeOpacity={1}
                    style={styles.destinationsWrapper}
                  >
                    <AntDesign
                      style={styles.destinationsIcon}
                      name="enviromento"
                      size={30}
                    />

                    <View style={styles.destinationsContent}>
                      <Text style={styles.destinationsCity}>{item.city}</Text>
                      <Text style={styles.destinationsRegion}>
                        City in {item.region}, {item.country}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
          )}
        </View>
      ) : (
        <View>
          {filteredResults.map(
            (item) =>
              item.city.toLowerCase().includes(searchText.toLowerCase()) && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.destinationsWrapper}
                  onPress={() => createSearchQuery(item.city)}
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
              )
          )}
          {db.map(
            (item) =>
              item.city.toLowerCase().includes(searchText.toLowerCase()) && (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => createSearchQuery(item.city)}
                  style={styles.destinationsWrapper}
                >
                  <View style={styles.destinationsIcon}>
                    <FontAwesome6 name="bed" size={24} color="black" />
                  </View>
                  <View style={styles.destinationsContent}>
                    <Text style={styles.destinationsHotelName}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
          )}
        </View>
      )}
    </View>
  );
};

export default Destinations;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
  },
  destinationsWrapper: {
    flexDirection: "row",
    marginTop: 10,
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
  },
});
