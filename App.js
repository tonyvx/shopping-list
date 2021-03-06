import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { ShoppingList } from "./components/ShoppingList";
import { AppContext, initialState, reducer } from "./data/AppContext";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
    background: "#000",
  },
};



export default function App() {
  
  const [context, dispatch] = React.useReducer(reducer, initialState);

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider
        value={{
          context,
          dispatch,
        }}
      >
        <ShoppingList />
      </AppContext.Provider>
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
