import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/authScreen/login";
import SignUp from "../screens/authScreen/signup";
import Splash from "../screens/splashScreen/splash";
import StartScreen from "../screens/startScreen/startScreen";
import { RootStackParamList } from "../types/navigation";
import OnboardingStack from "./onboardingStack";
import TabsNavigator from "./tabsNavigator";
import ProfileCreation from "../screens/profileCreation/profileCreation";
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
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="ProfileCreation" component={ProfileCreation} />
      <Stack.Screen name="MainTabs" component={TabsNavigator} />
    </Stack.Navigator>
  );
}
