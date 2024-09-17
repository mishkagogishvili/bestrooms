import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useEffect, useState } from "react";

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Provider } from "@ant-design/react-native";
import { Calendar } from "react-native-calendars";

const CalendarDrawer = ({ onOpen }) => {
  const {
    closeChange,
    markedDates,
    handleDayPress,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setMarkedDates,
    handleOpenBottomSheet,
  } = useGlobalState();
  const bottomSheetRefCustom = useRef(null);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        onPress={closeChange}
      />
    ),
    []
  );

  const snapPoints = ["70%", "70%"];

  const handleOpen = () => {
    bottomSheetRefCustom.current?.snapToIndex(0);
  };

  useEffect(() => {
    onOpen(handleOpen);
  }, [onOpen]);

  const handleClose = () => {
    bottomSheetRefCustom.current?.close();
    setStartDate(null);
    setEndDate(null);
    handleOpenBottomSheet();
  };

  function handleNext() {
    bottomSheetRefCustom.current?.close();
  }

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setMarkedDates(null);
  };

  return (
    <BottomSheet
      ref={bottomSheetRefCustom}
      index={-0.99} // Initially closed
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
      <Provider>
        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="car" size={24} color="black" />
          <Text style={styles.amenitiesText}>parking</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="dumbbell" size={24} color="black" />
          <Text style={styles.amenitiesText}>fitness center</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="hot-tub" size={24} color="black" />
          <Text style={styles.amenitiesText}>sauna </Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="swimming-pool" size={24} color="black" />
          <Text style={styles.amenitiesText}>pool </Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="utensil-spoon" size={24} color="black" />
          <Text style={styles.amenitiesText}>restaurant</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="broom" size={24} color="black" />
          <Text style={styles.amenitiesText}>room service</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="taxi" size={24} color="black" />
          <Text style={styles.amenitiesText}>airport transfer</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="coffee" size={24} color="black" />
          <Text style={styles.amenitiesText}>breakfast</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="spa" size={24} color="black" />
          <Text style={styles.amenitiesText}>spa</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="building" size={24} color="black" />
          <Text style={styles.amenitiesText}>conference room</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="hourglass" size={24} color="black" />
          <Text style={styles.amenitiesText}>24 hour service </Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="smoking-ban" size={24} color="black" />
          <Text style={styles.amenitiesText}>no smoking </Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="sun" size={24} color="black" />
          <Text style={styles.amenitiesText}>heating</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <Entypo name="air" size={24} color="black" />
          <Text style={styles.amenitiesText}>air conditioner</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="coffee" size={24} color="black" />
          <Text style={styles.amenitiesText}>tea coffee</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="map" size={24} color="black" />
          <Text style={styles.amenitiesText}>map service</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <AntDesign name="book" size={24} color="black" />
          <Text style={styles.amenitiesText}>guide book</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="child" size={24} color="black" />
          <Text style={styles.amenitiesText}>children playground</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="dog" size={24} color="black" />
          <Text style={styles.amenitiesText}>pet friendly</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <AntDesign name="wifi" size={24} color="black" />
          <Text style={styles.amenitiesText}>Free high speed Wifi</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="wine-glass-alt" size={24} color="black" />
          <Text style={styles.amenitiesText}>24 Hour Bar</Text>
        </View>

        <View style={styles.amenitiesWrapper}>
          <FontAwesome5 name="bicycle" size={24} color="black" />
          <Text style={styles.amenitiesText}>Gym Area</Text>
        </View>
      </Provider>
    </BottomSheet>
  );
};

export default CalendarDrawer;

const styles = StyleSheet.create({
  calendarDrawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  guestsPickerLastSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  guestsPickerSkip: {
    width: 100,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    backgroundColor: "white",
  },
  guestsPickerNext: {
    width: 220,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    backgroundColor: "#c4c4c4",
  },
  guestsPickerNextActive: {
    width: 220,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    backgroundColor: "#212628",
  },
  guestsPickerSkipText: {
    color: "black",
    fontSize: 16,
  },
  guestsPickerNextText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
