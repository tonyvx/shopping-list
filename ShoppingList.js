import React, { useState } from "react";
import { View } from "react-native";
import {
  Appbar,
  Button,
  Checkbox,
  Chip,
  List,
  Searchbar,
} from "react-native-paper";

export const ShoppingList = ({ list }) => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  const check = (id) => () =>
    selected.includes(id)
      ? setSelected(selected.filter((tid) => tid !== id))
      : setSelected([...selected, id]);

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
      <Button onPress={() => setShowSelected(!showSelected)} icon="camera">
        Show Selected
      </Button>
      <View style={{ overflow: "auto" }}>
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
                  <View
                    style={{ display: "flex", flexDirection: "row" }}
                    key={i.id}
                  >
                    <Checkbox
                      style={{ margin: 4 }}
                      onPress={check(i.id)}
                      status={
                        selected && selected.includes(i.id)
                          ? "checked"
                          : "unchecked"
                      }
                    />
                    <List.Item
                      key={i.id}
                      title={i.title}
                      description={i.notes}
                      left={(props) => <List.Icon {...props} icon="folder" />}
                    ></List.Item>
                  </View>
                ))}
              </View>
            ))}
      </View>
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
