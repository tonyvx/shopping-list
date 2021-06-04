import React, { useState } from "react";
import { FlatList, View } from "react-native";
import {
  Searchbar,
  Appbar,
  List,
  Divider,
  Text,
  Chip,
  Checkbox,
} from "react-native-paper";

import { IKContext, IKImage, IKUpload } from "imagekit-react";
import { Hidden } from "@material-ui/core";

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
        <Searchbar
        onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ width: 200 }}
        />
      </Appbar.Header>
      <View style={{ overflow: "auto" }}>
        {list &&
          list
            .filter((item) =>
              item.filter(
                (i) =>
                  !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
            .map((item) => (
              <View
                key={item[0].shopping_category_id}
                style={{ width: "80vw" }}
              >
                <Chip>{item[0].shopping_category_id}</Chip>
                {item
                  .filter(
                    (i) =>
                      !searchQuery ||
                      i.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((i) => (
                    <View style={{ display: "flex", flexDirection: "row" }}>
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
