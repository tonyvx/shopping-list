import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Chip, Searchbar } from "react-native-paper";
import { ShoppingItem } from "./ShoppingItem";
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

export const ShoppingList = ({ list }) => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  const check = (id) => () =>
    selected.includes(id)
      ? setSelected(selected.filter((tid) => tid !== id))
      : setSelected([...selected, id]);

  React.useEffect(() => {
    (async () => {
      // if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      // }
    })();
  }, []);

  return (
    <View style={{ margin: 16 }}>
      <Appbar.Header>
        <Appbar.Content title="Shopping List" subtitle="Shop away..." />
      </Appbar.Header>
      <Searchbar
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ width: "80%", alignSelf: "center", margin: 8 }}
      />
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
function itemsToBeDisplayed(item, searchQuery, showSelected, selected) {
  return item.filter(
    (i) =>
      matchesSearch(searchQuery, i) &&
      showSelectedItems(showSelected, selected, i)
  );
}

function showSelectedItems(showSelected, selected, i) {
  return !showSelected || selected.includes(i.id);
}

function matchesSearch(searchQuery, i) {
  return (
    !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
