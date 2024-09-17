import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Radio } from "@ant-design/react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

const ChangeCurrencyRadioBtn = ({ onSelect }) => {
  const {
    changeCurrency,
    setChangeCurrency,
    setShowChangeContent,
    setShowChange,
  } = useGlobalState();

  const options = [
    { label: "$ USD", value: "usd" },
    { label: "₾ GEL", value: "gel" },
  ];

  const onChange = (e) => {
    setChangeCurrency(e.target.value);
    setShowChangeContent(0);
    setShowChange(false);
  };

  return (
    <Radio.Group options={options} onChange={onChange} value={changeCurrency} />
  );
};

const styles = StyleSheet.create({});

export default ChangeCurrencyRadioBtn;
