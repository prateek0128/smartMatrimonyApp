import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddMedia from "../screens/onboardingScreen/addMedia";
import PersonalDetails from "../screens/onboardingScreen/personalDetails";
import { OnboardingStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddMedia"
        component={AddMedia}
        options={{ title: "Onboarding" }}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{ title: "Info Form" }}
      />
    </Stack.Navigator>
  );
}
