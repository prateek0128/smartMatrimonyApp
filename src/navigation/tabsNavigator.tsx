import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../types/navigation";

import AdvancedSearch from "../screens/advancedSearchScreen/advancedSearch";
import Chat from "../screens/chatScreen/chat";
import HomeStack from "./homeStack";
import SettingsStack from "./settingsStack";

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ title: "Settings" }}
      />
      <Tab.Screen
        name="AdvancedSearch"
        component={AdvancedSearch}
        options={{ title: "Advanced Search" }}
      />
      <Tab.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
    </Tab.Navigator>
  );
}
