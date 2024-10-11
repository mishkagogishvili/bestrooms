import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalState } from "../context/GlobalStateProvider";

import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const { hotelInfo } = useGlobalState();

  const mapCoordinates = {
    latitude: parseFloat(hotelInfo.hotel.latitude),
    longitude: parseFloat(hotelInfo.hotel.longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  return (
    <View>
      <MapView region={mapCoordinates} style={styles.map}>
        <Marker
          coordinate={{
            latitude: parseFloat(hotelInfo.hotel.latitude),
            longitude: parseFloat(hotelInfo.hotel.longitude),
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: 328,
    height: 272,
    marginHorizontal: "auto",
    marginVertical: 25,
  },
});
