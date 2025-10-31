import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Splash from "../screens/splashScreen/splash";
import { RootStackParamList } from "../types/navigation";
import OnboardingStack from "./onboardingStack";
import TabsNavigator from "./tabsNavigator";
import Login from "../screens/authScreen/login";
import StartScreen from "../screens/startScreen/startScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="MainTabs" component={TabsNavigator} />
    </Stack.Navigator>
  );
}
