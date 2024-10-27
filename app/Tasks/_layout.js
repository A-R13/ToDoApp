import { Stack } from "expo-router";
import { Modal } from "react-native";

export default function ListLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "ToDo" }} />
      <Stack.Screen
        name="createTask"
        options={{ title: "Add a Task", presentation: Modal }}
      />
    </Stack>
  );
}
