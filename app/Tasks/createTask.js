import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function createTask() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.TitleInput}
        placeholder="Title"
        placeholderTextColor={"grey"}
      ></TextInput>
      <TextInput
        value={description}
        onChangeText={setDesc}
        style={styles.DescInput}
        placeholder="Description"
        placeholderTextColor={"grey"}
        multiline={true}
        numberOfLines={2}
      ></TextInput>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelBtn}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() =>
            navigation.navigate("index", { title, description, imgSrc })
          }
        >
          <Text style={styles.btnText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
  },
  TitleInput: {
    height: 40,
    width: "80%",
    backgroundColor: "white",
    fontSize: "24",
    marginBottom: 10,
    borderRadius: 6,
    padding: 6,
  },
  DescInput: {
    height: 80,
    width: "80%",
    backgroundColor: "white",
    fontSize: "14",
    borderRadius: 6,
    padding: 6,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    margin: 15,
  },

  btnText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  submitBtn: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#AED6E8",
  },
  cancelBtn: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#FFCCCC",
  },
});
