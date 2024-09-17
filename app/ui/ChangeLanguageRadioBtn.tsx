import React from "react";
import { StyleSheet } from "react-native";
import { Radio } from "@ant-design/react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

const RadioGroupExample = ({ onSelect }) => {
  const {
    changeLanguage,
    setChangeLanguage,
    setShowChangeContent,
    setShowChange,
    setLanguage,
    language,
  } = useGlobalState();

  const options = [
    { label: "English", value: "en" },
    { label: "Georgian", value: "ka" },
  ];

  const onChange = (e) => {
    setChangeLanguage(e.target.value);
    setShowChangeContent(0);
    setShowChange(false);
    setLanguage(e.target.value);
  };

  return (
    <Radio.Group options={options} onChange={onChange} value={changeLanguage} />
  );
};

const styles = StyleSheet.create({});

export default RadioGroupExample;
