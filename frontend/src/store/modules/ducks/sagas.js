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

export function signLeave() {
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

export function* listStudents() {
  try {
    const response = yield call(api.get, "students");

    const students = response.data;

    if (response.data.status === "error") {
      return toast.error(response.data.msg);
    }

    yield put(Creators.listStudentsSuccess(students));
  } catch (err) {
    toast.error("Falha na busca das exchanges");
    yield put(Creators.listFailure());
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.REQUEST_AUTH, sagasAuth),
  takeLatest(Types.LEAVE_AUTH, signLeave),
  takeLatest(Types.REQUEST_LISTSTUDENTS, listStudents)
]);
