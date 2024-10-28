import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

export default function viewTask() {
  //Title, description, image
  const route = useRoute();
  const { task, updateTask } = route.params;
  // const { title, imgSrc, description } = useLocalSearchParams();
  const navigation = useNavigation();

  const [displayTitle, setTitle] = useState(task.title);
  const [displayImg, setImg] = useState(task.imgSrc);
  const [displaydesc, setDesc] = useState(task.description);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };
  const takeImage = async () => {
    const permission = await ImagePicker.getCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({});
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    const updatedTask = {
      title: displayTitle,
      description: displaydesc,
      imgSrc: displayImg,
      idx: task.idx,
    };
    updateTask(updatedTask);
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.headingText}>View/Edit a Task 🛠️</Text>
      <TextInput
        style={styles.TitleInput}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={"grey"}
      >
        {displayTitle}
      </TextInput>
      <TextInput
        style={styles.DescInput}
        onChangeText={setDesc}
        placeholder="Description"
        placeholderTextColor={"grey"}
        multiline={true}
        numberOfLines={2}
      >
        {displaydesc}
      </TextInput>
      {displayImg && displayImg !== "null" ? (
        <Image source={{ uri: displayImg }} style={styles.img}></Image>
      ) : null}

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => pickImage()}>
          <Text style={styles.btnText}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={() => takeImage()}>
          <Text style={styles.btnText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={() => handleUpdate()}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 200,
  },
  headingText: {
    fontSize: 28,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  backBtn: {
    position: "absolute",
    top: 70,
    left: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#AED6E8",
  },
  btnContainer: {
    flexDirection: "row",
    margin: 25,
    width: "70%",
    justifyContent: "space-evenly",
    fontSize: 18,
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
  TitleInput: {
    marginTop: 80,
    height: 40,
    width: "80%",
    backgroundColor: "white",
    fontSize: "24",
    marginBottom: 10,
    borderRadius: 6,
    padding: 6,
  },
  DescInput: {
    margin: 50,
    height: 80,
    width: "80%",
    backgroundColor: "white",
    fontSize: "14",
    borderRadius: 6,
    padding: 6,
  },
});
