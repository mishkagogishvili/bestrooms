import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CountryFlag from "react-native-country-flag";

const Languages = () => {
  return (
    <>
      <View style={styles.horizontalLine}></View>
      <View>
        <Text style={styles.text}>Available languages</Text>
        <View style={styles.languagesWrapper}>
          <View style={styles.languages}>
            <CountryFlag isoCode="DE" size={20} />
            <Text style={styles.languagesText}>German</Text>
          </View>
          <View style={styles.languages}>
            <CountryFlag isoCode="GE" size={20} />
            <Text style={styles.languagesText}>Georgian</Text>
          </View>
          <View style={styles.languages}>
            <CountryFlag isoCode="Cn" size={20} />
            <Text style={styles.languagesText}>Chinese</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Languages;

const styles = StyleSheet.create({
  text: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#434343",
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  languagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  languages: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    paddingTop: 5,
    width: 107,
    height: 32,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  languagesText: {
    paddingBottom: 5,
  },
});
