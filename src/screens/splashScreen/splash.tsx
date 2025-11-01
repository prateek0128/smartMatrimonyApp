// src/screens/splash/Splash.tsx
import AsyncStorage from "@react-native-async-storage/async-storage"; // npm i @react-native-async-storage/async-storage
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, Animated, Easing } from "react-native";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function Splash({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    const boot = async () => {
      try {
        // Simulate minimal boot time; remove if not needed
        await new Promise((r) => setTimeout(r, 2500));

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
  }, [navigation, fadeAnim, scaleAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/splash.png")}
        style={[
          styles.backgroundImage,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>SmartMatrimony</Text>
          <Text style={styles.tagline}>Find Your Perfect Match</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.sub}>Preparing your experience…</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  sub: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
