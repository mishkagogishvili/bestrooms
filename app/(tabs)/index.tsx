import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import Header from "../ui/Header";
import Search from "../ui/Search";
import PopularDestinations from "../ui/PopularDestinations";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import Drawer from "../ui/Drawer";
import { View } from "@ant-design/react-native";

const App = () => {
  const { openCalendarDrawer, setSuggestions } = useGlobalState();
  const [toggleCalendar, setToggleCalendar] = useState(1);

  const handleOutsideClick = () => {
    setSuggestions("");
    Keyboard.dismiss();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.container}>
            <Header />
            <Search
              toggleCalendar={toggleCalendar}
              setToggleCalendar={setToggleCalendar}
            />
          </View>
        </TouchableWithoutFeedback>
        <PopularDestinations />
      </ScrollView>
      <Drawer
        onOpen={(openFunction) => {
          openCalendarDrawer.current = openFunction;
        }}
        toggleCalendar={toggleCalendar}
        setToggleCalendar={setToggleCalendar}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default App;
