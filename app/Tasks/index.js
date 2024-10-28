import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";

const TASKS_STORE_KEY = "@tasks";

export default function listScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  const { title, description, imgSrc, newTaskColor } = useLocalSearchParams();
  // Render tasks on the screen
  useEffect(() => {
    if (title && description) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { title, description, imgSrc, completed: false },
      ]);
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

  //Haptic Feedback for buttons
  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== taskIndex));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const addTask = () => {
    navigation.navigate("createTask");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        index === updatedTask.idx ? (task = updatedTask) : task
      )
    );
  };
  const viewTask = (title, description, imgSrc, idx) => {
    task = { title, description, imgSrc, idx };
    task.title = title;
    (task.description = description), (task.imgSrc = imgSrc), (task.idx = idx);
    navigation.navigate("viewTask", { task, updateTask });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const markTaskComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) =>
        idx === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text>ToDoList</Text>
      {!tasks.length && (
        <Text style={styles.emptyText}>You have no Tasks.😁👍 </Text>
      )}
      <View style={styles.scrollContainer}>
        <ScrollView>
          {tasks.map(({ title, description, imgSrc, completed }, idx) => (
            <View key={idx + title} style={styles.tileContainer}>
              <TouchableOpacity
                style={[styles.tile, completed && styles.completedTile]}
                onPress={() => viewTask(title, description, imgSrc, idx)}
              >
                {imgSrc && imgSrc !== "null" ? (
                  <Image source={{ uri: imgSrc }} style={styles.image} />
                ) : null}
                <View style={styles.textContainer}>
                  <Text
                    style={[styles.title, completed && styles.completedText]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {title}
                  </Text>
                  <Text
                    style={[
                      styles.description,
                      completed && styles.completedText,
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    markTaskComplete(idx);
                  }}
                >
                  {!completed ? (
                    <FontAwesome name="circle-o" size={28} color="black" />
                  ) : (
                    <FontAwesome name="circle" size={28} color="black" />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(idx)}>
                <Ionicons name="close-circle-outline" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={() => addTask()}>
        <Ionicons name="add-circle" size={42} color="black"></Ionicons>
        <Text style={styles.addLabel}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  tileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center ",
    width: "100%",
    paddingTop: 15,
  },
  emptyText: {
    position: "absolute",
    top: "40%",
  },
  tile: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 15,
    alignItems: "center",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "80%",
  },
  completedTile: {
    backgroundColor: "#d3d3d3", // Light gray background for completed task
  },

  completedText: {
    textDecorationLine: "line-through", // Strike-through effect
    color: "#a9a9a9", // Gray text
  },
  scrollContainer: {
    marginBottom: 110,
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
    paddingLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    paddingLeft: 10,
  },
  doneIcon: {
    justifyContent: "center",
    right: 5,
  },
});
