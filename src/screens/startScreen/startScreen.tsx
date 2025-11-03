import PrimaryButton from "@/src/components/primaryButton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../types/navigation";

type StartScreenNavProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

const carouselData = [
  {
    id: 1,
    title: "A Smarter Way To Find Your Perfect Match!",
    subtitle:
      "Discover meaningful connections with India's first AI-powered matchmaking app.",
    image: require("../../assets/images/image1.jpg"),
  },
  {
    id: 2,
    title: "Connect With Compatible Partners",
    subtitle:
      "Our advanced algorithm matches you with people who share your values and interests.",
    image: require("../../assets/images/image2.jpg"),
  },
  {
    id: 3,
    title: "Start Your Journey Today with us",
    subtitle:
      "Join thousands of happy couples who found love through our platform.",
    image: require("../../assets/images/image3.jpg"),
  },
];

const StartScreen = () => {
  const navigation = useNavigation<StartScreenNavProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNewRegister = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselData.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * (width - 32),
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.carousel}
        >
          {carouselData.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(255,255,255,0.7)",
                  "rgba(255,255,255,1)",
                ]}
                style={styles.gradient}
                locations={[0, 0.5, 1]}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.middleSection}>
          <View style={styles.textContent}>
            <Text style={styles.heading1}>
              {carouselData[currentIndex].title}
            </Text>
            <Text style={styles.subheading}>
              {carouselData[currentIndex].subtitle}
            </Text>
          </View>
          <View style={styles.dotsContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={"New user? Register for free"}
            onPress={handleNewRegister}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  carousel: {
    flexGrow: 0,
  },
  slide: {
    width: width - 32,
    height: height * 0.5,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  middleSection: {
    alignItems: "center",
    gap: 35,
  },
  textContent: {
    alignItems: "center",
    height: 80,
    justifyContent: "center",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#9CA3AF",
  },
  activeDot: {
    backgroundColor: "#1F2937",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: "#F43F5E",
    borderRadius: 12,
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    color: "#666",
  },
  loginLink: {
    fontSize: 16,
    color: "#F43F5E",
    fontWeight: "600",
  },
});
