import React from "react";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export const ShowSelectedToggle = ({ setShowSelected, showSelected }) => {
  return (
    <Button onPress={() => setShowSelected(!showSelected)}>
      <>
        <MaterialCommunityIcons
          name="check"
          raised
          size={24}
        ></MaterialCommunityIcons>
        <Text>SHOW SELECTED</Text>
      </>
    </Button>
  );
};
