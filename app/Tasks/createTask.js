import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function createTask() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [imgSrc, setImg] = useState(null);

  const [newTaskColor, setNewTaskColor] = useState("#fff"); // Default task color

  const colors = ["#ade8f4", "#ccd5ae", "#f2cc8f", "#f4acb7", "#dee2ff"]; // List of colors
  const navigation = useNavigation();

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

  return (
    <View style={styles.Container}>
      <Text style={styles.headingText}>Add A Task 📝</Text>
      <TouchableOpacity
        style={styles.upload}
        onPress={() =>
          navigation.navigate("index", {
            title,
            description,
            imgSrc,
            newTaskColor,
          })
        }
      >
        <Ionicons name="arrow-up-circle-sharp" size={36} color="black" />
      </TouchableOpacity>
      <View style={styles.colorContainer}>
        <View style={styles.colorPickerContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                {
                  backgroundColor: color,
                  borderWidth: newTaskColor === color ? 2 : 0,
                },
              ]}
              onPress={() => setNewTaskColor(color)}
            />
          ))}
        </View>
        <Text>Choose Tile colour</Text>
      </View>
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
      {imgSrc ? (
        <Image source={{ uri: imgSrc }} style={styles.selectedImage}></Image>
      ) : (
        <Text>Select a Image</Text>
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => pickImage()}>
          <Text style={styles.btnText}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={() => takeImage()}>
          <Text style={styles.btnText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 40,
  },
  headingText: {
    fontSize: 32,
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
  upload: {
    position: "absolute",
    right: 20,
    top: 45,
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
  selectedImage: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  colorContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  colorPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
});
