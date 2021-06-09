import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import {
  AppContext,
  deleteItem,
  hideItem,
  insertList,
  updateItem,
} from "../data/AppContext";

export const UpdateItem = () => {
  const { dispatch, context } = React.useContext(AppContext);
  const [newItem, setNewItem] = React.useState({
    title: "",
    notes: "",
    photo_url: "",
    shopping_category_id: "",
  });
  useEffect(() => {
    context.item && setNewItem(context.item);
  }, [context.item]);

  const setup = (field) => (text) => setNewItem({ ...newItem, [field]: text });

  return (
    <Card
      style={{
        display: context.item ? "block" : "none",
        width: "70%",
        alignSelf: "center",
        top: 0,
        position: "absolute",
        zIndex: 100,
      }}
    >
      <Card.Title title="About Item" subtitle="Add details here"></Card.Title>
      <Card.Content>
        <ScrollView>
          {["title", "notes", "photo_url", "position"].map((field) => (
            <TextInput
              style={{ backgroundColor: "white", color: "black" }}
              label={field}
              onChangeText={(text) => setup(field)(text)}
              value={newItem[field]}
              key={field}
            ></TextInput>
          ))}
          <Picker
            selectedValue={newItem.shopping_category_id}
            onValueChange={(itemValue, itemIndex) =>
              setup("shopping_category_id")(itemValue)
            }
          >
            {Object.values(context.list).map((items) => (
              <Picker.Item
                key={items[0].shopping_category_id}
                label={items[0].shopping_category_id}
                value={items[0].shopping_category_id}
              />
            ))}
          </Picker>
          <Button
            onPress={() => {
              if (newItem.id) {
                updateItem(dispatch, newItem);
              } else {
                insertList(dispatch, newItem);
              }
              hideItem(dispatch);
            }}
          >
            SAVE
          </Button>
          <Button
            onPress={() => {
              hideItem(dispatch);
            }}
          >
            CANCEL
          </Button>

          <Button
            onPress={() => {
              deleteItem(dispatch, context.item);
              hideItem(dispatch);
            }}
          >
            DELETE
          </Button>
        </ScrollView>
      </Card.Content>
    </Card>
  );
};
