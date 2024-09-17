import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SearchPageTags = () => {
  return (
    <View style={styles.tagsWrapper}>
      <View style={styles.horizontalLine} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.tagsBtn}>
          <Text style={styles.white}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagsBtnActive}>
          <Text style={styles.black}>Nearby</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchPageTags;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tagsWrapper: {
    marginHorizontal: 0,
    marginVertical: 15,
    marginTop: -15,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  tagsBtn: {
    width: 90,
    height: 35,
    borderRadius: 3,
    backgroundColor: "#212628",
    alignItems: "center",
    paddingTop: 5,
    cursor: "pointer",
    marginRight: 10,
  },
  tagsBtnActive: {
    width: 90,
    height: 35,
    borderRadius: 3,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 5,
    cursor: "pointer",
    marginRight: 10,
  },
  white: {
    color: "white",
    fontSize: 14,
  },
  black: {
    color: "#212628",
    fontSize: 14,
  },
});
