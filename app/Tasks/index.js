import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
const TASKS_STORE_KEY = "@tasks";

export default function listScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  const { title, description, imgSrc } = useLocalSearchParams();

  // Render tasks on the screen
  useEffect(() => {
    if (title && description) {
      setTasks((prevTasks) => [...prevTasks, { title, description, imgSrc }]);
    }
  }, [title, description, imgSrc]);

  // Persistance, read saved tasks from tasks
  useEffect(() => {
    const getData = async () => {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORE_KEY);
      storedTasks && setTasks(JSON.parse(storedTasks));
    };
    getData();
  }, []);

  // Save tasks whenever tasks is changed
  useEffect(() => {
    const saveTask = async () => {
      await AsyncStorage.setItem(TASKS_STORE_KEY, JSON.stringify(tasks));
    };
    saveTask();
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text>ToDoList</Text>
      {tasks.map(({ title, description, imgSrc }, idx) => (
        <TouchableOpacity
          key={idx + title}
          style={styles.tile}
          onPress={() =>
            navigation.navigate("viewTask", { title, description, imgSrc })
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("createTask")}
      >
        <Ionicons name="add-circle" size={48} color="black"></Ionicons>
        <Text style={styles.addLabel}>Add</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => setTasks([])}>
        <Text>-</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },

  tile: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "90%",
  },

  iconContainer: {
    position: "absolute",
    bottom: 25,
    right: 45,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  addTask: {
    fontSize: 42,
  },
  addLabel: {
    fontSize: "14",
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    color: "grey",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
