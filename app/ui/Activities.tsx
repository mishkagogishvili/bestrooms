import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { useRouter } from "expo-router";

const Activities = () => {
  const { hotelInfo, setServiceId } = useGlobalState();
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  const navigateToActivities = (service) => {
    router.push(`/ui/activitiesDetails/?id=${service.id}`);
    setServiceId(service.id);
  };

  const handleShowAllToggle = () => setShowAll((prev) => !prev);

  const displayedActivities = showAll
    ? hotelInfo.premium_services
    : hotelInfo.premium_services.slice(0, 2);

  return (
    <View>
      <View style={styles.amenitiesHeader}>
        <Text style={styles.text}>Activities and Services</Text>
        <Text style={styles.text}>(Premium)</Text>
      </View>
      {displayedActivities.map((service, index) => {
        return (
          <View key={index} style={styles.activitiesWrapper}>
            <View style={styles.flex}>
              <Image
                style={styles.activitiesImage}
                source={{ uri: service.images[0].url }}
              />
              <Text style={styles.activitiesText}>
                {service.translations[0].title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigateToActivities(hotelInfo)}
              style={styles.activitiesDetails}
              activeOpacity={1}
            >
              <Text>Details</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity
        activeOpacity={1}
        style={styles.amenitiesBtn}
        onPress={handleShowAllToggle}
      >
        <Text style={styles.amenitiesBtnText}>
          All activities and services (12)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  amenitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  amenitiesWrapper: {
    flexDirection: "row",
    margin: 10,
  },
  amenitiesText: {
    marginTop: 2,
    marginLeft: 10,
  },
  activitiesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  activitiesText: {
    width: 185,
    marginLeft: 15,
    fontWeight: "500",
    color: "#434343",
  },
  activitiesDetails: {
    marginTop: 20,
  },
  activitiesImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
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
  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },
  flex: {
    flexDirection: "row",
    marginVertical: 15,
  },
});
