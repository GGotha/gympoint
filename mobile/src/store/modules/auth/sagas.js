import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../services/api";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload, navigation }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "/", {
      email,
      password
    });

    const { token, user } = response.data;

    // if (user.provider) {
    //   Alert.alert(
    //     "Erro no login",
    //     "O usuário não pode ser prestador de serviços"
    //   );
    //   return;
    // }

    console.tron.log("DADOS DO RESPONSE:", response.data);

    console.tron.log("navegar:", navigation);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    navigation.navigate("dashboard");

    // history.push("/dashboard");
  } catch (err) {
    console.tron.log("ERRO SIGNIN:", err);
    Alert.alert(
      "Falha na autenticação",
      "Houve um erro no login, verifique seus dados"
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, "users", {
      name,
      email,
      password
    });

    // history.push('/');
    navigation.navigate("/login");
    Alert.alert("Success", "Usuário criado");
  } catch (err) {
    Alert.alert(
      "Falha no cadastro",
      "Houve um erro no cadastro, verifique seus dados"
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp)
]);
