import React, { useState } from "react";
import { Text } from "react-native";
import ActiveBookingHeader from "../ui/ActiveBookingHeader";
import { useGlobalState } from "@/components/context/GlobalStateProvider";
import ActiveBookingContent from "../ui/ActiveBookingContent";
import PastBookings from "../ui/PastBookings";

export default function active() {
  const { activeBtn } = useGlobalState();
  return (
    <>
      <ActiveBookingHeader />

      {activeBtn == "1" && <ActiveBookingContent />}
      {activeBtn == "2" && <PastBookings />}
    </>
  );
}
