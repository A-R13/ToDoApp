import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Tasks"
        options={{
          title: "ToDo",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list-circle" size={28} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={28} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
