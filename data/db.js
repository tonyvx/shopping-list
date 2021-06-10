import * as SQLite from "expo-sqlite";
import { shoppingList } from "./list";

export const update = async (sql, data = []) => {
  const response = await new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("myDatabaseName.db");

    db.transaction(function (txn) {
      // Drop the table if it exists

      txn.executeSql(
        sql,
        data,
        function (tx, res) {
          resolve(res);
        },
        function (tx, err) {
          reject(err);
        }
      );
    });
  });
  console.log("db.update", response);
  return response;
};

export const insert = async (sql, data) => {
  const db = SQLite.openDatabase("myDatabaseName.db");
  const response = await new Promise((resolve, reject) =>
    db.transaction(function (txn) {
      txn.executeSql(
        sql,
        data,
        function (tx, res) {
          resolve(res);
        },
        function (tx, err) {
          reject(err);
        }
      );
    })
  );
  console.log(response);
  return response;
};

export const getItems = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("myDatabaseName.db");
    db.transaction(function (txn) {
      // Create the table and define the properties of the columns
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS SHOPPING_LIST(id VARCHAR(36) PRIMARY KEY NOT NULL, title VARCHAR(30), notes VARCHAR(100),photo_url VARCHAR(30), position INTEGER, active INTEGER,completed INTEGER, shopping_category_id VARCHAR(30), image BLOB)",
        []
      );
      txn.executeSql(
        "SELECT * FROM `SHOPPING_LIST`",
        [],
        function (tx, res) {
          let array = [];
          for (let i = 0; i < res.rows.length; i++) {
            array.push(res.rows.item(i));
          }
          if (Array.isArray(array) && array.length > 0) {
            resolve(array);
          } else {
            const items = insertDefaults(txn);
            resolve(items);
          }
        },
        function (tx, err) {
          reject(err);
        }
      );
    });
  });
};
function insertDefaults(txn) {
  const items = shoppingList.shopping_list_items
    // .reduce((list, items) => [...list, ...items], [])
    .map((item) => {
      return {
        id: item.id,
        title: item.title,
        notes: item.notes,
        photo_url: item.photo_url,
        position: item.position,
        active: item.active ? 1 : 0,
        completed: item.completed ? 1 : 0,
        shopping_category_id: item.shopping_category_id,
        image: item.image,
      };
    });
  items.forEach((item) =>
    txn.executeSql(
      "INSERT INTO SHOPPING_LIST (id,title,notes, photo_url, position,active, completed, shopping_category_id, image) VALUES (:id,:title,:notes, :photo_url, :position,:active, :completed, :shopping_category_id, :image)",
      [
        item.id,
        item.title,
        item.notes,
        item.photo_url,
        item.position,
        item.active,
        item.completed,
        item.shopping_category_id,
        item.image,
      ]
    )
  );
  return items;
}
