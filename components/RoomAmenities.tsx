import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { useGlobalState } from "./context/GlobalStateProvider";
import RoomPage from "@/app/ui/RoomPage";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RoomAmenities = ({ state, data }) => {
  const { hotelRoom } = useGlobalState();
  const [showAll, setShowAll] = useState(false);

  console.log(data);

  const iconMapping = {
    amenity_air_conditioning: {
      icon: (
        <MaterialCommunityIcons
          name="air-conditioner"
          size={24}
          color="black"
        />
      ),
      label: "air-conditioner",
    },
    amenity_internet: {
      icon: <FontAwesome5 name="mouse-pointer" size={24} color="black" />,
      label: "internet",
    },
    amenity_tv: {
      icon: <FontAwesome5 name="tv" size={24} color="black" />,
      label: "TV",
    },
    amenity_telephone: {
      icon: <AntDesign name="phone" size={24} color="black" />,
      label: "telephone",
    },
    amenity_bath: {
      icon: <FontAwesome5 name="bath" size={24} color="black" />,
      label: "bath",
    },
    amenity_towels: {
      icon: <FontAwesome5 name="cloud-showers-heavy" size={24} color="black" />,
      label: "Towel",
    },
    amenity_heating: {
      icon: <FontAwesome5 name="sun" size={24} color="black" />,
      label: "heating",
    },
    amenity_hairdryer: {
      icon: (
        <MaterialCommunityIcons name="hair-dryer" size={24} color="black" />
      ),
      label: "hairdryer",
    },
    amenity_free_toiletries: {
      icon: <FontAwesome5 name="toilet-paper" size={24} color="black" />,
      label: "free toiletries",
    },
    amenity_tea_coffee: {
      icon: <FontAwesome5 name="coffee" size={24} color="black" />,
      label: "tea, coffee",
    },
    amenity_city_view: {
      icon: <FontAwesome5 name="building" size={24} color="black" />,
      label: "city view",
    },
    amenity_balcony: {
      icon: <MaterialCommunityIcons name="balcony" size={24} color="black" />,
      label: "balcony",
    },
    amenity_flat_screen_tv: {
      icon: <FontAwesome5 name="tv" size={24} color="black" />,
      label: "flat screen tv",
    },
    amenity_orthopedic_mattress: {
      icon: <FontAwesome6 name="mattress-pillow" size={24} color="black" />,
      label: "orthopedic mattress",
    },
    amenity_slippers: {
      icon: <Fontisto name="beach-slipper" size={24} color="black" />,
      label: "slippers",
    },
    amenity_soap: {
      icon: <FontAwesome5 name="soap" size={24} color="black" />,
      label: "soap",
    },
    amenity_shampoo: {
      icon: <FontAwesome5 name="pump-soap" size={24} color="black" />,
      label: "shampoo",
    },
    amenity_body_soap: {
      icon: <FontAwesome5 name="soap" size={24} color="black" />,
      label: "body soap",
    },
    amenity_recycle_bin: {
      icon: <AntDesign name="delete" size={24} color="black" />,
      label: "recycle bin",
    },
    amenity_bottled_water: {
      icon: <FontAwesome5 name="wine-bottle" size={24} color="black" />,
      label: "bottled water",
    },
    amenity_minibar: {
      icon: <FontAwesome5 name="glass-whiskey" size={24} color="black" />,
      label: "minibar",
    },
    amenity_safe: {
      icon: <MaterialCommunityIcons name="safe" size={24} color="black" />,
      label: "safe",
    },
    amenity_shower: {
      icon: <FontAwesome5 name="shower" size={24} color="black" />,
      label: "shower",
    },
    amenity_kitchen: {
      icon: <FontAwesome6 name="kitchen-set" size={24} color="black" />,
      label: "kitchen",
    },
    amenity_workspace: {
      icon: <FontAwesome5 name="user-tie" size={24} color="black" />,
      label: "workspace",
    },
    amenity_smoking: {
      icon: <FontAwesome5 name="smoking" size={24} color="black" />,
      label: "smoking",
    },
    amenity_shared_bathroom: {
      icon: <FontAwesome5 name="shower" size={24} color="black" />,
      label: "shared bathroom",
    },
    amenity_shared_toilet: {
      icon: <FontAwesome6 name="toilets-portable" size={24} color="black" />,
      label: "shared toilet",
    },
    amenity_garden_view: {
      icon: <FontAwesome6 name="sun-plant-wilt" size={24} color="black" />,
      label: "garden view",
    },
    amenity_private_entrance: {
      icon: <FontAwesome5 name="door-open" size={24} color="black" />,
      label: "private entrance",
    },
    amenity_terrace: {
      icon: <MaterialCommunityIcons name="balcony" size={24} color="black" />,
      label: "terrace",
    },
    amenity_wardrobe: {
      icon: <MaterialCommunityIcons name="wardrobe" size={24} color="black" />,
      label: "wardrobe",
    },
    amenity_anti_allergic_linen: {
      icon: <FontAwesome5 name="bed" size={24} color="black" />,
      label: "anti allergic linen",
    },
    amenity_anti_allergic_pads: {
      icon: <FontAwesome6 name="suitcase-medical" size={24} color="black" />,
      label: "anti allergic pads",
    },
    amenity_anti_mosquito_grid: {
      icon: <MaterialCommunityIcons name="curtains" size={24} color="black" />,
      label: "anti mosquito grid",
    },
    amenity_refrigerator: {
      icon: <MaterialCommunityIcons name="amplifier" size={24} color="black" />,
      label: "refrigerator",
    },
  };

  const handleShowAllToggle = () => setShowAll((prev) => !prev);

  const displayedAmenities =
    hotelRoom && hotelRoom.amenities ? (
      showAll ? (
        hotelRoom.amenities
      ) : (
        hotelRoom.amenities.slice(0, 5)
      )
    ) : (
      <Text>loading...</Text>
    );

  if (state) {
    return (
      <>
        {data && data != undefined ? (
          data.map((amenitie, index) => {
            const amenityName = amenitie.name.trim().toLowerCase();
            const amenityDetails = iconMapping[amenityName];
            return amenityDetails ? (
              <View style={styles.roomAmenitie}>
                {amenityDetails.icon}
                <Text style={{ marginTop: 2, paddingLeft: 5 }}>
                  {amenityDetails.label}
                </Text>
              </View>
            ) : null;
          })
        ) : (
          <Text>loading...</Text>
        )}
      </>
    );
  } else {
    return (
      <>
        <View style={styles.amenitiesHeader}>
          <Text style={styles.text}>Property Amenities</Text>
          <Text style={styles.text}>(free access)</Text>
        </View>
        {hotelRoom && hotelRoom.amenities && displayedAmenities ? (
          displayedAmenities.map((amenitie, index) => {
            const amenityName = amenitie.name.trim().toLowerCase();
            const amenityDetails = iconMapping[amenityName];

            return amenityDetails ? (
              <View style={styles.amenitiesWrapper} key={index}>
                {amenityDetails.icon}
                <Text style={styles.amenitiesText}>{amenityDetails.label}</Text>
              </View>
            ) : null;
          })
        ) : (
          <Text>loading...</Text>
        )}
        {hotelRoom && hotelRoom.amenities && displayedAmenities ? (
          hotelRoom.amenities.length > 5 && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.amenitiesBtn}
              onPress={handleShowAllToggle}
            >
              <Text style={styles.amenitiesBtnText}>
                {showAll
                  ? "Hide Amenities"
                  : `View all Amenities (${hotelRoom.amenities.length})`}
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <Text>loading...</Text>
        )}
      </>
    );
  }
};

export default RoomAmenities;

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
  roomAmenitie: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#9d9d9d",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginRight: 10,
    alignSelf: "flex-start",
    justifyContent: "space-between",
  },
});
