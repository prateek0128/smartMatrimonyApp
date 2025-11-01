// src/screens/splash/Splash.tsx
import AsyncStorage from "@react-native-async-storage/async-storage"; // npm i @react-native-async-storage/async-storage
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function Splash({ navigation }: Props) {
  useEffect(() => {
    const boot = async () => {
      try {
        // Simulate minimal boot time; remove if not needed
        await new Promise((r) => setTimeout(r, 600));

        // Replace these with your real checks (auth token, profile status, etc.)
        const token = await AsyncStorage.getItem("auth_token");
        const onboardingDone =
          (await AsyncStorage.getItem("onboarding_done")) === "true";


        if (!token) {
          navigation.replace("Start");
          return;
        }

        if (!onboardingDone) {
          navigation.replace("Signup");
          return;
        }

        // Logged in + onboarding complete → go to tabs (Home → Dashboard)
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainTabs",
              params: { screen: "HomeTab", params: { screen: "Dashboard" } },
            },
          ],
        });
      } catch (e) {
        // In case of any boot error, send to Login
        //   navigation.replace("Login");
      }
    };

    boot();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Optional logo */}
      <Image
        source={require("../../assets/images/splash-icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>SmartMatrimony</Text>
      <ActivityIndicator size="large" />
      <Text style={styles.sub}>Preparing your experience…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logo: { width: 120, height: 120, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700" },
  sub: { fontSize: 12, color: "#6B7280" },
});