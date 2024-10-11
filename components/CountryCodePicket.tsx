import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import * as Location from "expo-location";
import { useGlobalState } from "./context/GlobalStateProvider";

const CountryCodePicker = ({
  setMobileNumber,
  mobileNumber,
  mobileNumberValidation,
}) => {
  const {
    setCallingCode,
    callingCode,
    countryCode,
    setCountryCode,
    setInputNumber,
    inputNumber,
  } = useGlobalState();
  const [isPickerVisible, setPickerVisible] = useState(false);

  const fetchCountryCode = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.countryCode) {
          setCountryCode(data.countryCode);
          const code = getCallingCode(data.countryCode);
          setCallingCode(code);
          setMobileNumber(`${code} `);
        }
      })
      .catch((error) => console.error("Error fetching country code:", error));
  };

  const getCallingCode = (countryCode) => {
    const callingCodes = {
      US: "1",
      CA: "1",
      GE: "995",
      GB: "44",
      AU: "61",
      IN: "91",
      // Add additional country codes as necessary
    };
    return callingCodes[countryCode] || "unable to set code";
  };

  useEffect(() => {
    fetchCountryCode();
  }, []);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    const code = country.callingCode[0];
    setCallingCode(code);
    setMobileNumber(code); // Update mobile number with new calling code
    setPickerVisible(false); // Close picker after selection
  };

  function handleSubmitEditing() {
    setInputNumber(mobileNumber);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Country Code:</Text>

      <TouchableOpacity
        style={styles.countryPickerButton}
        onPress={() => setPickerVisible(true)}
      >
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withFilter
          withModal
          onSelect={onSelect}
          visible={isPickerVisible}
          onClose={() => setPickerVisible(false)}
        />
        <Text style={styles.callingCode}>+{callingCode}</Text>
      </TouchableOpacity>

      <TextInput
        keyboardType="numeric"
        maxLength={13}
        style={styles.input}
        placeholder="Phone number"
        value={mobileNumber}
        onChangeText={(text) => {
          setMobileNumber(text);
        }}
        onSubmitEditing={handleSubmitEditing}
      />
      {!mobileNumberValidation && (
        <Text style={{ color: "red" }}>Please Enter Your Mobile Number</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 10,
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  callingCode: {
    fontSize: 18,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 20,
  },
});

export default CountryCodePicker;
