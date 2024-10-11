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

const ForYou = () => {
  const { db, hotelList, toggleFavorite } = useGlobalState();

  return (
    <>
      <View style={styles.divider}></View>
      <View style={styles.container}>
        <View style={styles.popularDestinationsHeader}>
          <Text style={styles.popularDestinationsText}>Recomended For You</Text>
          <Link href="../(tabs)/active">
            <Text>See all</Text>
          </Link>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardsWrapper}>
            {hotelList && hotelList.hotelDestinations ? (
              hotelList.hotels.data.map((item) => (
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
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ForYou;

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
    height: 240,
    justifyContent: "space-between",
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
