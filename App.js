import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { shoppingList } from "./list";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { ShoppingList } from "./ShoppingList";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
    text:"#ED5151"
  },
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function App() {
  const db = SQLite.openDatabase("myDatabaseName.db");
  const [list, setList] = useState(null);
  React.useEffect(() => {
    db.transaction(async function (txn) {
      // Drop the table if it exists
      // txn.executeSql("DROP TABLE IF EXISTS SHOPPING_LIST", []);

      // Create the table and define the properties of the columns
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS SHOPPING_LIST(id VARCHAR(36) PRIMARY KEY NOT NULL, title VARCHAR(30), notes VARCHAR(100),photo_url VARCHAR(30), position INTEGER, active INTEGER,completed INTEGER, shopping_category_id VARCHAR(30), image BLOB)",
        []
      );

      // shoppingList.shopping_list_items.forEach((item) =>
      //   txn.executeSql(
      //     "INSERT INTO SHOPPING_LIST (id,title,notes, photo_url, position,active, completed, shopping_category_id) VALUES (:id,:title,:notes, :photo_url, :position,:active, :completed, :shopping_category_id)",
      //     [
      //       uuidv4(),
      //       item.title,
      //       item.notes,
      //       item.photo_url,
      //       item.position,
      //       item.active ? 1 : 0,
      //       item.completed ? 1 : 0,
      //       item.shopping_category_id,
      //     ]
      //   )
      // );

      const response = await new Promise((resolve, reject) =>
        txn.executeSql("SELECT * FROM `SHOPPING_LIST`", [], function (tx, res) {
          let array = [];
          for (let i = 0; i < res.rows.length; i++) {
            array.push(res.rows.item(i));
          }
          resolve(array);
        })
      );
      const sList = response
        .sort((a, b) => a.position - b.position)
        .sort((a, b) =>
          a.shopping_category_id > b.shopping_category_id ? 1 : -1
        );
      setList(
        Object.values(
          sList.reduce((a, i) => {
            !a[i.shopping_category_id]
              ? (a[i.shopping_category_id] = [i])
              : a[i.shopping_category_id].push(i);
            return a;
          }, {})
        )
      );

      console.log(sList);
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ShoppingList list={list} style={{ overflow: "hidden" }} />
    </PaperProvider>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
