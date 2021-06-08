import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { update } from "../data/db";
import { AppContext, updateList } from "../data/AppContext";

export const UploadImageButton = ({ item }) => {
  const { dispatch, context } = React.useContext(AppContext);
  const handleFileRead = (event) => {
    // const file = event.target.files[0];
    // const base64 = await convertBase64(file);
    // const base64 = event.uri;
    // await update(
    //   "UPDATE SHOPPING_LIST SET image='" + base64 + "' WHERE id='" + id + "'",
    //   id
    // );

    updateList(dispatch, { ...item, image: event.uri });
    console.log(event.uri);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = (id) => async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      includeBase64: true,
      selectionLimit: 1,
      maxHeight: 28,
      maxWidth: 28,
      quality: 0.5,
    });
    res.didCancel && console.log("upload cancelled");
    res.errorCode && console.log("error ", res.errorCode);
    res.errorMessage && console.log("error ", res.errorMessage);
    res.assets && console.log("assets ", res.assets[0]);
    handleFileRead(res);
  };
  return (
    <Button onPress={uploadImage(item.id)} style={{ height: 48 }}>
      <MaterialCommunityIcons
        raised
        type="materialicons"
        name="upload"
        color="#00aced"
        size={24}
        style={{ marginTop: 16 }}
      ></MaterialCommunityIcons>
    </Button>
  );
};
