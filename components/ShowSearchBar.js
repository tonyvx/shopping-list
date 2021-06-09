import React from "react";
import { View } from "react-native";
import {
  Avatar,
  Button,
  Searchbar,
  Modal,
  Text,
  TextInput,
} from "react-native-paper";
import { AppContext, insertList } from "../data/AppContext";
import { matchesSearch } from "./ShoppingList";
import { Picker } from "@react-native-picker/picker";

export const ShowSearchBar = ({ searchQuery, setSearchQuery }) => {
  const [active, setActive] = React.useState(false);
  const [newItem, setNewItem] = React.useState({});
  const { dispatch, context } = React.useContext(AppContext);

  const showModal = () => setActive(true);
  const hideModal = () => setActive(false);
  const setup = (field) => (text) => setNewItem({ ...newItem, [field]: text });
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  };

  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Searchbar
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ width: "80%", alignSelf: "center", margin: 8 }}
        />
        {context.list &&
        !context.list.find((items) =>
          items.find((item) => matchesSearch(searchQuery, item))
        ) ? (
          <Button
            onPress={() => {
              setActive("first");
              setNewItem({ title: searchQuery });
            }}
          >
            <Avatar.Icon icon="plus" size={48} />
          </Button>
        ) : null}
      </View>
      <Modal
        visible={active}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        style={{ top: 100 }}
      >
        {["title", "notes", "photo_url", "position"].map((field) => (
          <TextInput
            style={{ backgroundColor: "white", color: "black" }}
            label={field}
            onChangeText={setup(field)}
            value={newItem[field]} key={field}
          ></TextInput>
        ))}
        <Picker
          selectedValue={newItem.shopping_category_id}
          onValueChange={(itemValue, itemIndex) =>
            setup("shopping_category_id")(itemValue)
          }
        >
          {Object.values(context.list).map((items) => (
            <Picker.Item key={items[0].shopping_category_id}
              label={items[0].shopping_category_id}
              value={items[0].shopping_category_id}
            />
          ))}
        </Picker>
        <Button
          onPress={() => {
            insertList(dispatch, newItem);
            hideModal();
          }}
        >
          ADD
        </Button>
      </Modal>
    </>
  );
};
