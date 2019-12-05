import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./config/ReactotronConfig";
import { StatusBar } from "react-native";

import { colors, metrics } from "./styles";
import { store, persistor } from "./store";
import App from "./App";

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <App />
      </PersistGate>
    </Provider>
  );
}
