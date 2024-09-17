import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="search1"
              size={30}
              color={focused ? "black" : "#dcdcdc"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="heart"
              size={30}
              color={focused ? "black" : "#dcdcdc"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="active"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="enviromento"
              size={30}
              color={focused ? "black" : "#dcdcdc"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="setting"
              size={30}
              color={focused ? "black" : "#dcdcdc"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SearchPage"
        options={{
          title: "test",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="bookingDetails"
        options={{
          title: "test",
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
