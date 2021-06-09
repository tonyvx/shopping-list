import React from "react";
import { View } from "react-native";
import { Avatar, Button, Searchbar } from "react-native-paper";
import { AppContext, showItem } from "../data/AppContext";
import { matchesSearch } from "./ShoppingList";
import { UpdateItem } from "./UpdateItem";

export const ShowSearchBar = ({ searchQuery, setSearchQuery }) => {
  const { dispatch, context } = React.useContext(AppContext);

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
              showItem(dispatch, { title: searchQuery });
            }}
          >
            <Avatar.Icon icon="plus" size={48} />
          </Button>
        ) : null}
      </View>
      <UpdateItem />
    </>
  );
};


