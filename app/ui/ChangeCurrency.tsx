import React, { useState } from "react";
import { Button, Modal } from "@ant-design/react-native";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChangeCurrencyRadioBtn from "../ui/ChangeCurrencyRadioBtn";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

import AntDesign from "@expo/vector-icons/AntDesign";

const ChangeCurrency = () => {
  const [visible, setVisible] = useState(false);
  const { changeCurrency } = useGlobalState();

  const onClose = () => {
    setVisible(false);
  };

  return (
    <View>
      <Text>Change Currency</Text>
      <Button style={styles.changeLanguageBtn} onPress={() => setVisible(true)}>
        <View style={styles.changeLanguageBtnInner}>
          <Text>{changeCurrency}</Text>
          <AntDesign name="down" size={24} color="black" />
        </View>
      </Button>
      <Modal
        title=""
        transparent
        onClose={onClose}
        maskClosable
        visible={visible}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.ChangeLanguageHeader}
        >
          <Text>Change Currency</Text>
          <AntDesign name="up" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ paddingVertical: 20 }}>
          <ChangeCurrencyRadioBtn />
        </View>
      </Modal>
    </View>
  );
};

export default ChangeCurrency;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  settingsHeader: {
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  changeLanguageBtn: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderWidth: 0,
  },
  changeLanguageBtnInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  ChangeLanguageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
