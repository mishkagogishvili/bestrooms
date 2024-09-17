import React from "react";
import { StyleSheet } from "react-native";
import { Radio } from "@ant-design/react-native";
import { useGlobalState } from "@/components/context/GlobalStateProvider";

const RecommendedRadioBtn = () => {
  const { recommendedOptions, setRecommendedOptions, setRecommendedVisible } =
    useGlobalState();

  const options = [
    { label: "Recommended", value: "Recommended" },
    { label: "Rating: Low to High", value: "Rating: Low to High" },
    { label: "Rating: High to Low", value: "Rating: High to Low" },
    { label: "Price: Low to High", value: "Price: Low to High" },
    { label: "Price: High to Low", value: "Price: High to Low" },
    { label: "Nearest from me", value: "Nearest from me" },
  ];

  const onChange = (e) => {
    setRecommendedOptions(e.target.value);
    setRecommendedVisible(false);
  };

  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={recommendedOptions}
    />
  );
};

const styles = StyleSheet.create({});

export default RecommendedRadioBtn;
