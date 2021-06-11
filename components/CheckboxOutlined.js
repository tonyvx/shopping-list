import React from "react";
import { View } from "react-native";
import { Avatar, Button, Checkbox } from "react-native-paper";

export const CheckboxOutlined = ({ onPress, status }) => {
  return (
    <View style={{ height: 60, width: 60, alignItems: "center" }}>
      {!status ? (
        <Button onPress={onPress} size={48}>
          <Avatar.Icon
            icon="square-outline"
            color={"#00aced"}
            size={36}
            style={{
              backgroundColor: "white",
            }} />
        </Button>
      ) : (
        <Checkbox
          uncheckedColor="#00aced"
          onPress={onPress}
          status={"checked"} />
      )}
    </View>
  );
};
