import { takeLatest, call, put, all } from "redux-saga/effects";

import { Creators, Types } from "./reducers";

import history from "~/services/history";
import api from "~/services/api";

import { toast } from "react-toastify";

export function* sagasAuth({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "/users/authenticate", {
      email,
      password
    });

    const { token, user } = response.data;

    if (response.data.status === "error") {
      return toast.error(response.data.msg);
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(Creators.signInSuccess(token, user));

    history.push("/alunos");
  } catch (err) {
    console.log(err);
    toast.error("Falha na autenticação, verifique seus dados");
    yield put(Creators.signFailure());
  }
}

export function signOut() {
  history.push("/");
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.Reducers;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.REQUEST_AUTH, sagasAuth),
  takeLatest(Types.OUT_AUTH, signOut)
]);
