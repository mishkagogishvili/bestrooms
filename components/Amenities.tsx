import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useGlobalState } from "./context/GlobalStateProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const Amenities = ({ Api }) => {
  const { hotelInfo } = useGlobalState();
  const [showAll, setShowAll] = useState(false); // state to track visibility

  const iconMapping = {
    parking: {
      icon: <FontAwesome5 name="car" size={24} color="black" />,
      label: "parking",
    },
    fitness: {
      icon: <FontAwesome5 name="dumbbell" size={24} color="black" />,
      label: "fitness center",
    },
    sauna: {
      icon: <FontAwesome5 name="hot-tub" size={24} color="black" />,
      label: "sauna",
    },
    pool: {
      icon: <FontAwesome5 name="swimming-pool" size={24} color="black" />,
      label: "pool",
    },
    restaurant: {
      icon: <FontAwesome5 name="utensil-spoon" size={24} color="black" />,
      label: "restaurant",
    },
    room_service: {
      icon: <FontAwesome5 name="broom" size={24} color="black" />,
      label: "room service",
    },
    airport_transfer: {
      icon: <FontAwesome5 name="taxi" size={24} color="black" />,
      label: "airport transfer",
    },
    breakfast: {
      icon: <FontAwesome5 name="coffee" size={24} color="black" />,
      label: "breakfast",
    },
    spa: {
      icon: <FontAwesome5 name="spa" size={24} color="black" />,
      label: "spa",
    },
    conference_room: {
      icon: <FontAwesome5 name="building" size={24} color="black" />,
      label: "conference room",
    },
    service24: {
      icon: <FontAwesome5 name="hourglass" size={24} color="black" />,
      label: "24 hour service",
    },
    no_smoking: {
      icon: <FontAwesome5 name="smoking-ban" size={24} color="black" />,
      label: "no smoking",
    },
    heating: {
      icon: <FontAwesome5 name="sun" size={24} color="black" />,
      label: "heating",
    },
    air_conditioner: {
      icon: <Entypo name="air" size={24} color="black" />,
      label: "air conditioner",
    },
    tea_coffee: {
      icon: <FontAwesome5 name="coffee" size={24} color="black" />,
      label: "tea coffee",
    },
    map_service: {
      icon: <FontAwesome5 name="map" size={24} color="black" />,
      label: "map service",
    },
    guide_book: {
      icon: <AntDesign name="book" size={24} color="black" />,
      label: "guide book",
    },
    children_playground: {
      icon: <FontAwesome5 name="child" size={24} color="black" />,
      label: "children playground",
    },
    pet_friendly: {
      icon: <FontAwesome5 name="dog" size={24} color="black" />,
      label: "pet friendly",
    },
    wifi: {
      icon: <AntDesign name="wifi" size={24} color="black" />,
      label: "Free high speed Wifi",
    },
    bar: {
      icon: <FontAwesome5 name="wine-glass-alt" size={24} color="black" />,
      label: "24 Hour Bar",
    },
    gym: {
      icon: <FontAwesome5 name="bicycle" size={24} color="black" />,
      label: "Gym Area",
    },
  };

  const handleShowAllToggle = () => setShowAll((prev) => !prev);

  const displayedAmenities = showAll
    ? Api.amenities
    : Api.amenities.slice(0, 5);

  return (
    <>
      <View style={styles.amenitiesHeader}>
        <Text style={styles.text}>Property Amenities</Text>
        <Text style={styles.text}>(free access)</Text>
      </View>
      {displayedAmenities.map((amenitie, index) => {
        const amenityName = amenitie.name.trim().toLowerCase();
        const amenityDetails = iconMapping[amenityName];

        return amenityDetails ? (
          <View style={styles.amenitiesWrapper} key={index}>
            {amenityDetails.icon}
            <Text style={styles.amenitiesText}>{amenityDetails.label}</Text>
          </View>
        ) : null;
      })}
      {Api.amenities.length > 5 && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.amenitiesBtn}
          onPress={handleShowAllToggle}
        >
          <Text style={styles.amenitiesBtnText}>
            {showAll
              ? "Hide Amenities"
              : `View all Amenities (${Api.amenities.length})`}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Amenities;

const styles = StyleSheet.create({
  amenitiesWrapper: {
    flexDirection: "row",
    margin: 10,
  },
  amenitiesText: {
    marginTop: 2,
    marginLeft: 10,
  },
  amenitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },

  amenitiesBtn: {
    marginVertical: 10,
    height: 48,
    alignItems: "center",
    paddingTop: 12,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  amenitiesBtnText: {
    fontWeight: "500",
    color: "#434343",
  },
});
