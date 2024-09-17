import { List, Provider, Slider, Toast } from "@ant-design/react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
export default function RangeSlider() {
  const [range, setRange] = useState([0, 2550]);

  const handleSliderChange = (value) => {
    setRange(value);
  };

  const marks = {};

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <List>
          <List.Item style={styles.sliderContainer}>
            <Slider
              icon={
                <Entypo
                  style={styles.circle}
                  name="circle"
                  size={24}
                  color="black"
                />
              }
              min={0}
              max={2550}
              marks={marks}
              range
              defaultValue={[0, 2550]}
              style={styles.test}
              onChange={handleSliderChange}
            />
            <View style={styles.rangePriceWrapper}>
              <View style={styles.rangePrice}>
                <Text>${range[0]}</Text>
              </View>
              <View style={styles.rangePrice}>
                <Text>${range[1]}</Text>
              </View>
            </View>
          </List.Item>
        </List>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  slider: {
    backgroundColor: "red",
  },
  circle: {
    backgroundColor: "#f0f0f0",
  },
  test: {
    color: "black",
    backgroundColor: "#f0f0f0",
  },
  rangePriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  rangePrice: {
    backgroundColor: "#F5F5F5",
    width: 60,
    height: 32,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
