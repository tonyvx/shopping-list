import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Chip, Snackbar } from "react-native-paper";
import {
  AppContext,
  clearSnackBar,
  setList,
  showItem,
  updateItem,
} from "../data/AppContext";
import { itemsToBeDisplayed } from "./itemsToBeDisplayed";
import { ShoppingItem } from "./ShoppingItem";
import { ShowSearchBar } from "./ShowSearchBar";
import { ShowSelectedToggle } from "./ShowSelectedToggle";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 30,
    height: 58,
  },
});

export const ShoppingList = () => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  const { dispatch, context } = React.useContext(AppContext);
  const { list } = context;

  const check = (id) => () =>
    selected.includes(id)
      ? setSelected(selected.filter((tid) => tid !== id))
      : setSelected([...selected, id]);

 

  React.useEffect(() => {
    setList(dispatch);
  }, []);

  return (
    <View style={{ margin: 16 }}>
      <Snackbar
        style={{ width: 20, height: 20 }}
        visible={!!context.snackbar}
        onDismiss={() => clearSnackBar(dispatch)}
        action={{
          label: "close",
          onPress: () => {
            clearSnackBar(dispatch);
          },
        }}
      >
        {context.snackbar}
      </Snackbar>
      <Appbar.Header>
        <Appbar.Content title="Shopping List" subtitle="Shop away..." />
      </Appbar.Header>
      <ShowSearchBar {...{ searchQuery, setSearchQuery }} />
      <ShowSelectedToggle {...{ setShowSelected, showSelected }} />
      <ScrollView style={{ height: "70%" }}>
        {list &&
          list
            .filter(
              (item) =>
                itemsToBeDisplayed(item, searchQuery, showSelected, selected)
                  .length
            )
            .map((item) => (
              <View key={item[0].shopping_category_id}>
                <Chip>{item[0].shopping_category_id}</Chip>
                {itemsToBeDisplayed(
                  item,
                  searchQuery,
                  showSelected,
                  selected
                ).map((i) => (
                  <ShoppingItem
                    key={i.id}
                    item={i}
                    check={check}
                    selected={selected}
                  />
                ))}
              </View>
            ))}
      </ScrollView>
    </View>
  );
};
