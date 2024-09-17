import { StyleSheet, Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

const GuestSelector = () => {
  const {
    bottomSheetRef,
    snapPoints,
    renderBackdrop,
    countAdults,
    setCountAdults,
    countChildren,
    setCountChildren,
    handleCloseBottomSheet,
  } = useGlobalState();

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

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
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
        <View style={styles.container}>
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
    </BottomSheet>
  );
};

export default GuestSelector;

const styles = StyleSheet.create({
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
  container: {
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
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});
