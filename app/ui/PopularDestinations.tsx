import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useGlobalState } from "../../components/context/GlobalStateProvider";

const PopularDestinations = () => {
  const { db, hotelList, toggleFavorite } = useGlobalState();

  return (
    <>
      <View style={styles.divider}></View>
      <View style={styles.container}>
        <View style={styles.popularDestinationsHeader}>
          <Text style={styles.popularDestinationsText}>
            Popular Destinations
          </Text>
          <Link href="../(tabs)/active">
            <Text>See all</Text>
          </Link>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardsWrapper}>
            {hotelList.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: item.images[0].url }}
                />
                <View>
                  <Text>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text>{item.isFavorite ? "unfavorite" : "favorite"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PopularDestinations;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allow content to grow in scroll view
    alignItems: "center",
    paddingHorizontal: 20, // Padding for horizontal scroll
  },
  divider: {
    width: "100%",
    height: 20,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  popularDestinationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  popularDestinationsText: {
    fontSize: 16,
    color: "#212628",
  },
  cardsWrapper: {
    flexDirection: "row",
    gap: 25,
    paddingVertical: 30,
  },
  card: {
    width: 242,
    height: 300,
    justifyContent: "space-between", // Ensure image and button are spaced properly
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    width: 65,
    alignSelf: "center", // Center the button
  },
});
