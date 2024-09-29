import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const SignUpScreen = ({ userInformation, setUserInformation }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const router = useRouter();
  const navigateToHome = () => {
    router.push("/");
  };
  const showCalendar = () => {
    setIsCalendarVisible(true);
  };
  const hideCalendar = () => {
    setIsCalendarVisible(false);
  };
  const handleDateSelect = (day) => {
    setUserInformation({ ...userInformation, dateOfBirth: day.dateString });
    hideCalendar();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Legal name</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="First name on ID"
            value={userInformation.firstName}
            onChangeText={(text) => {
              setUserInformation({ ...userInformation, firstName: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name on ID"
            value={userInformation.LastName}
            onChangeText={(text) => {
              setUserInformation({ ...userInformation, lastName: text });
            }}
          />
          <Text style={{ color: "grey", fontSize: 11 }}>
            Make sure this matches the name on your government ID.
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={showCalendar} style={styles.calendarInput}>
            <Text>
              {userInformation.dateOfBirth
                ? userInformation.dateOfBirth
                : "Birthdate"}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "grey", fontSize: 11 }}>
            To sign up, you need to be at least 18. Your birthday won’t be
            shared with other people who use Ehotel.
          </Text>
          <Modal
            visible={isCalendarVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.calendarWrapper}>
                <Calendar
                  onDayPress={handleDateSelect}
                  maxDate={new Date().toISOString().split("T")[0]} // Disable future dates
                />
                <TouchableOpacity
                  onPress={hideCalendar}
                  style={styles.closeButton}
                  activeOpacity={1}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <Text style={styles.label}>Contact info</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={userInformation.email}
            onChangeText={(text) => {
              setUserInformation({ ...userInformation, email: text });
            }}
          />
          <Text style={{ color: "grey", fontSize: 11 }}>
            We'll email you trip confirmations and receipts.
          </Text>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={navigateToHome}>
          <Text style={styles.formButton}>Finish Signing Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 35,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    paddingLeft: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  calendarInput: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingLeft: 20,
    justifyContent: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
  closeButton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  formButton: {
    width: "100%",
    margin: "auto",
    color: "white",
    backgroundColor: "#1d2123",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 15,
    marginTop: 25,
    textAlign: "center",
    borderRadius: 4,
  },
});
