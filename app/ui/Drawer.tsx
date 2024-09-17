import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { Provider } from "@ant-design/react-native";
import { Calendar } from "react-native-calendars";

const Drawer = ({ onOpen, toggleCalendar }) => {
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
    bottomSheetRef,
    countAdults,
    setCountAdults,
    countChildren,
    setCountChildren,
    handleCloseBottomSheet,
    today,
    tomorrow,
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
    setMarkedDates({});
  };

  function handleNext() {
    bottomSheetRefCustom.current?.close();
  }

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setMarkedDates(null);
  };

  function increment(state, count) {
    state(count + 1);
  }

  function decrementAdults() {
    if (countAdults < 2) {
      setCountAdults(countAdults);
      return;
    }
    setCountAdults(countAdults - 1);
  }
  function decrementChildren() {
    if (countChildren < 1) {
      setCountChildren(countChildren);
      return;
    }
    setCountChildren(countChildren - 1);
  }
  function Clear() {
    setCountAdults(1);
    setCountChildren(0);
  }
  const handleCloseSkip = () => {
    bottomSheetRef.current?.close();
    setCountAdults(1);
    setCountChildren(0);
  };

  const currentDate = new Date();

  return (
    <BottomSheet
      ref={bottomSheetRefCustom}
      index={-0.1} // Initially closed
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
      {toggleCalendar ? (
        <Provider>
          <View>
            <View style={styles.calendarDrawerHeader}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Select dates
              </Text>
              <TouchableOpacity onPress={handleClear} activeOpacity={1}>
                <Text style={{ color: "#9D9D9D" }}>Clear</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: "#9D9D9D", marginLeft: 20, marginTop: 10 }}>
              Check - in & Check - out
            </Text>
            <View style={styles.container}>
              <Calendar
                markedDates={markedDates}
                onDayPress={handleDayPress}
                markingType={"custom"}
                minDate={currentDate}
              />
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.calendarLastSection}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.guestsPickerSkip}
                onPress={handleClose}
              >
                <Text style={styles.guestsPickerSkipText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={
                  startDate && endDate
                    ? styles.guestsPickerNextActive
                    : styles.guestsPickerNext
                }
                onPress={startDate && endDate ? handleNext : null}
              >
                <Text style={styles.guestsPickerNextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Provider>
      ) : (
        <View>
          <View>
            <View style={styles.guestSelectorHeader}>
              <Text style={styles.guestSelectorHeaderText}>
                Select rooms and guests
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.guestSelectorHeaderClear}
                onPress={Clear}
              >
                <Text
                  style={
                    countAdults || countChildren
                      ? styles.guestSelectorHeaderClearText
                      : styles.guestSelectorHeaderClearTextDisabled
                  }
                >
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine}></View>
          </View>
          <View style={styles.containerCalendar}>
            <View style={styles.guestsPickerWrapper}>
              <Text style={styles.countAdultsName}>Adults</Text>
              <View style={styles.countAdultsWrapper}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => decrementAdults()}
                  style={
                    countAdults === "1"
                      ? styles.guestsPickerBtn
                      : styles.disabledGuestsPickerBtn
                  }
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.countAdultsText}>{countAdults}</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => increment(setCountAdults, countAdults)}
                  style={styles.guestsPickerBtn}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.guestsPickerWrapper}>
              <Text style={styles.countAdultsName}>Children</Text>
              <View style={styles.countAdultsWrapper}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => decrementChildren()}
                  style={
                    countChildren
                      ? styles.guestsPickerBtn
                      : styles.disabledGuestsPickerBtn
                  }
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.countAdultsText}>{countChildren}</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => increment(setCountChildren, countChildren)}
                  style={styles.guestsPickerBtn}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.guestsPickerLastSection}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.guestsPickerSkip}
                onPress={handleCloseSkip}
              >
                <Text style={styles.guestsPickerSkipText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={
                  countAdults
                    ? styles.guestsPickerNextActive
                    : styles.guestsPickerNext
                }
                onPress={handleClose}
              >
                <Text style={styles.guestsPickerNextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </BottomSheet>
  );
};

export default Drawer;

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
    marginTop: 240,
  },
  calendarLastSection: {
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

  guestSelectorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
  },

  guestSelectorHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  guestSelectorHeaderClear: {
    backgroundColor: "transparent",
    fontSize: 16,
    fontWeight: "500",
  },
  guestSelectorHeaderClearTextDisabled: {
    color: "#9d9d9d",
  },
  guestSelectorHeaderClearText: {
    color: "#333",
  },
  containerCalendar: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 40,
  },
  guestsPickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countAdultsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countAdultsName: {
    marginTop: 20,
  },
  guestsPickerBtn: {
    alignItems: "center",
    paddingTop: 7,
    marginHorizontal: 0,
    marginVertical: 10,
    borderRadius: 4,
    width: 40,
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 1,

    color: "#dfdfdf",
    borderColor: "#434343",
  },
  disabledGuestsPickerBtn: {
    alignItems: "center",
    paddingTop: 7,
    marginHorizontal: 0,
    marginVertical: 10,
    borderRadius: 4,
    width: 40,
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  countAdultsText: {
    height: 40,
    width: 40,
    margin: 0,
    textAlign: "center",
    paddingTop: 16,
    fontSize: 16,
  },
});
