import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppSettings from "../screens/settingsScreen/appSettings";
import ProfileSettings from "../screens/settingsScreen/profileSettings";
import { SettingsStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="App"
        component={AppSettings}
        options={{ title: "App Settings" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileSettings}
        options={{ title: "Profile Settings" }}
      />
    </Stack.Navigator>
  );
}
