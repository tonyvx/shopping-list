import React from "react";
import { View } from "react-native";
import { Avatar, Button, Paragraph, Text } from "react-native-paper";
import { AppContext, showItem } from "../data/AppContext";
import { CheckboxOutlined } from "./CheckboxOutlined";
import { UploadImageButton } from "./UploadImageButton";

export const ShoppingItem = ({ item, check, selected }) => {
  const { dispatch, context } = React.useContext(AppContext);
  const itemRef = React.useRef();
  // React.useEffect(() => {
  //   if (itemRef.current) {
  //     if (context.focusItem && context.focusItem.id === item.id)
  //       itemRef.current.scrollIntoView();
  //   }
  // }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      key={item.id}
      ref={itemRef}
    >
      <CheckboxOutlined
        status={selected && selected.includes(item.id)}
        onPress={check(item.id)}
      />
      {item.image ? (
        <Avatar.Image
          size={48}
          source={{ uri: item.image }}
          style={{ backgroundColor: "white" }}
        />
      ) : null}

      <View>
        <Button onPress={() => showItem(dispatch, item)}>
          <Text style={{ height: 48, marginTop: 20, marginLeft: 8 }}>
            {item.title}
          </Text>
        </Button>
        <Paragraph style={{ marginLeft: 16, color: "grey" }}>
          {item.notes}
        </Paragraph>
      </View>

      <UploadImageButton item={item} />
    </View>
  );
};


