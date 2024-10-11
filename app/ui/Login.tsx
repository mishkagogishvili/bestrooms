import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { useNavigation, useRouter } from "expo-router";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import LoginForm from "@/components/logIn/LoginForm";
import VerificationCodeScreen from "@/components/VerificationCodeScreen";
import SignUpScreen from "@/components/SignUpScreen";

const Login = () => {
  const {
    callingCode,
    countryCode,
    setInputNumber,
    sendSMS,
    sendVerificationCode,
  } = useGlobalState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberValidation, setMobileNumberValidation] = useState(true);
  const [invalidCode, setInvalidCode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState();
  const [isSubmittedCode, setIsSubmittedCode] = useState(false);
  const [userInformation, setUserInformation] = useState([
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
    },
  ]);

  const handleSubmit = () => {
    if (mobileNumber.length > 4) {
      setIsSubmitted(true);
      setInputNumber(mobileNumber);
      sendSMS();
      setMobileNumberValidation(true);
    } else {
      setMobileNumberValidation(false);
    }
  };
  const handleSubmitCode = () => {
    if (verificationCode !== sendVerificationCode) {
      setInvalidCode(true);
    }

    if (verificationCode == sendVerificationCode) {
      setIsSubmittedCode(true);
      setInvalidCode(false);
    }
  };
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Login or Register",
    });
  }, [navigation]);

  return (
    <>
      {!isSubmitted && (
        <LoginForm
          handleSubmit={handleSubmit}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          mobileNumberValidation={mobileNumberValidation}
        />
      )}
      {isSubmitted && !isSubmittedCode && (
        <VerificationCodeScreen
          mobileNumber={mobileNumber}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleSubmitCode={handleSubmitCode}
          invalidCode={invalidCode}
        />
      )}
      {isSubmittedCode && (
        <SignUpScreen
          userInformation={userInformation}
          setUserInformation={setUserInformation}
        />
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});
