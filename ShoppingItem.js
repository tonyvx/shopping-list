import React from "react";
import { View } from "react-native";
import { Avatar, Checkbox, Text } from "react-native-paper";
import { UploadImageButton } from "./UploadImageButton";

export const ShoppingItem = ({ item, check, selected }) => {
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
      <Text style={{ height: 48, marginTop: 20, marginLeft: 8 }}>
        {item.title}
      </Text>

      <UploadImageButton item={item} />
    </View>
  );
};
