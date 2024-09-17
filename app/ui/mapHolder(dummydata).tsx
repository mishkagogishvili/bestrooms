import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import StarRating from "../ui/StarRating";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

export default function App() {
  const {
    searchResult,
    hotelInfo,
    setHotelId,
    region,
    setRegion,
    selectedMarker,
    setSelectedMarker,
    handleMarkerPress,
  } = useGlobalState();

  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null); // Reference to MapView
  const router = useRouter();

  useEffect(() => {
    if (searchResult.data && searchResult.data.length > 0) {
      const coordinates = searchResult.data.map((result) => ({
        latitude: parseFloat(result.latitude),
        longitude: parseFloat(result.longitude),
      }));

      setIsSearching(true); // Detect search activity

      if (mapRef.current && coordinates.length > 0) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  }, [searchResult.data]);

  const navigateToDetail = (item, id) => {
    router.push(`/ui/HotelPage/?id=${item.id}`);
    setHotelId(id);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Attach reference to the MapView
        loadingEnabled={true}
        mapPadding={{
          top: 50,
          bottom: isSearching ? 400 : 200, // Adjust padding when searching
          left: 0,
          right: 0,
        }}
        style={styles.map}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {searchResult.data.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
      {selectedMarker && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigateToDetail(selectedMarker, selectedMarker.id)}
          style={styles.hotelView}
        >
          <View style={styles.sectionOne}>
            <Image
              style={styles.cardImage}
              source={{ uri: selectedMarker.images[0].url }}
            />
          </View>

          <View style={styles.sectionTwo}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {selectedMarker.translations[0].title}
                </Text>
                <Text style={{ color: "#9D9D9D" }}>
                  City in {selectedMarker.region}, {selectedMarker.country}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.cardHeart}
                  onPress={() => {
                    toggleFavorite(hotelInfo.id);
                  }}
                >
                  <AntDesign
                    style={styles.heartIcon}
                    name="heart"
                    size={24}
                    color="#FF0000"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <StarRating size={10} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="star-half-alt" size={20} color="#FFD363" />
                <Text style={{ marginLeft: 5, marginTop: 1 }}>
                  {selectedMarker.star_rating}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Text style={{ fontWeight: "bold" }}>$25 </Text>
                <Text style={{ color: "#9d9d9d" }}>/ night</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  sectionOne: {
    flex: 4,
  },
  cardImage: {
    width: 110,
    height: 120,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  sectionTwo: {
    flex: 8,
    paddingTop: 10,
    paddingLeft: 10,
  },
  hotelView: {
    width: 328,
    height: 120,
    borderRadius: 6,
    position: "absolute",
    bottom: 140,
    left: 46,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
  },
  cardHeart: {
    marginRight: 10,
  },
});
