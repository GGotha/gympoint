import React from "react";
import Routes from "./routes";
import GlobalStyles from "./global/GlobalStyle";
import "./config/ReactotronConfig";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import history from "./services/history";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles />
        <Router history={history}>
          <Routes />
        </Router>
        <ToastContainer autoClose={3000} />
      </PersistGate>
    </Provider>
  );
}
