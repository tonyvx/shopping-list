import React from "react";
import { View } from "react-native";
import { Avatar, Button, Checkbox, Text } from "react-native-paper";
import { AppContext, showItem } from "../data/AppContext";
import { UploadImageButton } from "./UploadImageButton";

export const ShoppingItem = ({ item, check, selected }) => {
  const { dispatch } = React.useContext(AppContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      key={item.id}
    >
      <Checkbox
        uncheckedColor="#00aced"
        color={"#00aced"}
        onPress={check(item.id)}
        status={
          selected && selected.includes(item.id) ? "checked" : "unchecked"
        }
      />
      {item.image ? (
        <Avatar.Image
          size={48}
          source={{ uri: item.image }}
          style={{ backgroundColor: "white" }}
        />
      ) : null}
      <Button onPress={() => showItem(dispatch, item)}>
        <Text style={{ height: 48, marginTop: 20, marginLeft: 8 }}>
          {item.title}
        </Text>
      </Button>

      <UploadImageButton item={item} />
    </View>
  );
};
