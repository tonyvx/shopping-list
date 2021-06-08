import React from "react";
import { update } from "./db";

import * as SQLite from "expo-sqlite";
import { shoppingList } from "./list";

export const AppContext = React.createContext();

export const initialState = {
  list: [],
};

export const reducer = (context, action) => {
  switch (action.type) {
    case "LIST":
      return {
        ...context,
        list: action.list,
      };
    case "UPDATE_LIST":
      return {
        ...context,
        list: [
          ...context.list,
          [...context.list[action.item.shopping_category_id], action.item],
        ],
      };

    default:
      return context;
  }
};
export const setList = (dispatch) => {
  const db = SQLite.openDatabase("myDatabaseName.db");
  db.transaction(async function (txn) {
    // Drop the table if it exists
    // txn.executeSql("DROP TABLE IF EXISTS SHOPPING_LIST", []);

    // Create the table and define the properties of the columns
    txn.executeSql(
      "CREATE TABLE IF NOT EXISTS SHOPPING_LIST(id VARCHAR(36) PRIMARY KEY NOT NULL, title VARCHAR(30), notes VARCHAR(100),photo_url VARCHAR(30), position INTEGER, active INTEGER,completed INTEGER, shopping_category_id VARCHAR(30), image BLOB)",
      []
    );

    const response = await new Promise((resolve, reject) =>
      txn.executeSql("SELECT * FROM `SHOPPING_LIST`", [], function (tx, res) {
        let array = [];
        for (let i = 0; i < res.rows.length; i++) {
          array.push(res.rows.item(i));
        }
        if (Array.isArray(array) && array.length > 0) {
          resolve(array);
        } else {
          shoppingList.shopping_list_items.forEach((item) =>
            txn.executeSql(
              "INSERT INTO SHOPPING_LIST (id,title,notes, photo_url, position,active, completed, shopping_category_id, image) VALUES (:id,:title,:notes, :photo_url, :position,:active, :completed, :shopping_category_id, :image)",
              [
                uuidv4(),
                item.title,
                item.notes,
                item.photo_url,
                item.position,
                item.active ? 1 : 0,
                item.completed ? 1 : 0,
                item.shopping_category_id,
                item.image,
              ]
            )
          );
        }
      })
    );
    const sList = response
      .sort((a, b) => a.position - b.position)
      .sort((a, b) =>
        a.shopping_category_id > b.shopping_category_id ? 1 : -1
      );

    const list = Object.values(
      sList.reduce((a, i) => {
        !a[i.shopping_category_id]
          ? (a[i.shopping_category_id] = [i])
          : a[i.shopping_category_id].push(i);
        return a;
      }, {})
    );
    dispatch({ type: "LIST", list });

    console.log(sList);
  });
};

export const updateList = (dispatch, item) => {
  // TODO
  const updatedItem = update(
    "UPDATE SHOPPING_LIST SET image='" +
      item.image +
      "' WHERE id='" +
      item.id +
      "'",
    item.id
  );
  dispatch({ type: "UPDATE_LIST", item });
};
