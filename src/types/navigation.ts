import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  Start: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: { phoneNumber: string };
  ProfileCreation: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  MainTabs: NavigatorScreenParams<TabsParamList>;
};

export type OnboardingStackParamList = {
  AddMedia: undefined;
  PersonalDetails: undefined;
};

export type TabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
  AdvancedSearch: undefined;
  Chat: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Overview: undefined;
};

export type SettingsStackParamList = {
  App: undefined;
  Profile: undefined;
};

export type OTPRouteProp = {
  key: string;
  name: "OTP";
  params: { phoneNumber: string };
};