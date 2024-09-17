import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useEffect } from "react";

import { StyleSheet, Text } from "react-native";
import ChangeLanguageRadioBtn from "./ChangeLanguageRadioBtn";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

const ChangeCurrencyDrawer = ({ onOpen }) => {
  const { closeChange } = useGlobalState();
  const bottomSheetRef = useRef(null);

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

  const snapPoints = ["30%", "30%"];

  const handleOpen = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (typeof onOpen === "function") {
      onOpen(handleOpen);
    }
  }, [onOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Initially closed
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
      <Text style={styles.changeLanguageDrawerName}>Change language</Text>
      <ChangeLanguageRadioBtn onSelect={handleClose} />
    </BottomSheet>
  );
};

export default ChangeCurrencyDrawer;

const styles = StyleSheet.create({
  changeLanguageDrawerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212628",
    marginLeft: 20,
    marginVertical: 10,
  },
});
