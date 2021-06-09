import React from "react";
import { getItems, insert, update } from "./db";

export const AppContext = React.createContext();

export const initialState = {
  list: [],
  snackbar: "",
};
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export const reducer = (context, action) => {
  switch (action.type) {
    case "LIST":
      return {
        ...context,
        list: action.list,
      };
    case "UPDATE_LIST":
      const newList = context.list.map((items) =>
        items[0].shopping_category_id === action.item.shopping_category_id
          ? items.map((item) =>
              item.id === action.item.id ? action.item : item
            )
          : items
      );

      return {
        ...context,
        list: newList,
      };

    case "INSERT_LIST":
      const addList = context.list.map((items) =>
        items[0].shopping_category_id === action.item.shopping_category_id
          ? [...items, action.item]
          : items
      );

      return {
        ...context,
        list: addList,
      };
    case "CLEAR_SNACKBAR":
      return { ...context, snackbar: "" };

    case "SET_SNACKBAR":
      return { ...context, snackbar: action.snackbar };
    default:
      return context;
  }
};
export const setList = async (dispatch) => {
  const response = await getItems();
  const sList = response
    .sort((a, b) => a.position - b.position)
    .sort((a, b) => (a.shopping_category_id > b.shopping_category_id ? 1 : -1));

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
};

export const updateList = async (dispatch, item) => {
  const updatedItem = await update(
    "UPDATE SHOPPING_LIST SET image='" +
      item.image +
      "' WHERE id='" +
      item.id +
      "'",
    item.id
  );
  dispatch({ type: "UPDATE_LIST", item });
  dispatch({ type: "SET_SNACKBAR", snackbar: updatedItem.rowsAffected });
};

export const clearSnackBar = (dispatch) => dispatch({ type: "CLEAR_SNACKBAR" });
export const setSnackBar = (dispatch, snackbar) =>
  dispatch({ type: "SET_SNACKBAR", snackbar });

export const insertList = async (dispatch, item) => {
  console.log([
    uuidv4(),
    item.title,
    item.notes || "",
    item.photo_url || "",
    item.position || 0,
    item.active ? 1 : 0,
    item.completed ? 1 : 0,
    item.shopping_category_id || "Misc.",
    item.image || "",
  ]);
  const updatedItem = await insert(
    "INSERT INTO SHOPPING_LIST (id,title,notes, photo_url, position,active, completed, shopping_category_id, image) VALUES (:id,:title,:notes, :photo_url, :position,:active, :completed, :shopping_category_id, :image)",
    [
      uuidv4(),
      item.title,
      item.notes || "",
      item.photo_url || "",
      item.position || 0,
      item.active ? 1 : 0,
      item.completed ? 1 : 0,
      item.shopping_category_id || "Misc.",
      item.image || "",
    ]
  );
  console.log(updatedItem);
  dispatch({ type: "INSERT_LIST", item });
};
