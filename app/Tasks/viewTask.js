import { Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function viewTask() {
  //Title, description, image
  const { title, imgSrc, description } = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => navigation.setOptions({ title }), [navigation]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{description}</Text>
    </View>
  );
}
