import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import { useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./src/assets/styles/colors";
import { ThemeContext, ThemeProvider } from "./src/context/themeContext";
import AppNavigator from "./src/navigation/appNavigator";
export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log("Error checking for updates:", error);
      }
    };

    checkForUpdates();
  }, []);
  return (
    <>
      <PaperProvider>
        {/* <GoogleAuthProvider>
          <GoogleAuthProviderWeb>
            <FacebookAuthProvider>
              <AppleAuthProvider>
                <AuthProvider> */}
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <StatusBar
                backgroundColor={
                  theme === "dark"
                    ? colors.octodenaryText
                    : colors.primaryBackground
                } // Android background color
                barStyle={theme === "dark" ? "light-content" : "dark-content"} // iOS & Android text/icons
                // translucent={true}
              />
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              {/* <ThemeToggleButton /> */}
              <FlashMessage position="top" />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
        {/*  </AuthProvider>
               </AppleAuthProvider>
            </FacebookAuthProvider>
          </GoogleAuthProviderWeb>
        </GoogleAuthProvider> */}
      </PaperProvider>
    </>
  );
}
