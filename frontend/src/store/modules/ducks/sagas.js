import { takeLatest, call, put, all } from "redux-saga/effects";

import { Creators, Types } from "./reducers";

import history from "~/services/history";
import api from "~/services/api";

import { toast } from "react-toastify";
import { parseISO, isBefore, format } from "date-fns";
import { pt } from "date-fns/locale";
import { FaRegCheckCircle } from "react-icons/fa";

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
    toast.error("Falha na busca dos alunos");
    yield put(Creators.listStudentsFailure());
  }
}

export function* listPlanos() {
  try {
    const response = yield call(api.get, "planos");

    const planosFormatados = response.data.map(data => ({
      ...data,
      price:
        "R$" +
        parseFloat(data.price)
          .toFixed(2)
          .replace(".", ","),
      duration:
        data.duration > 1 ? data.duration + " meses" : data.duration + " mês"
    }));

    if (response.data.status === "error") {
      return toast.error(response.data.msg);
    }

    yield put(Creators.listPlanosSuccess(planosFormatados));
  } catch (err) {
    toast.error("Falha na busca dos planos");
    yield put(Creators.listPlanosFailure());
  }
}

export function* listMatriculas() {
  try {
    const response = yield call(api.get, "matriculas");

    const matriculasFormatadas = response.data.map(data => ({
      ...data,
      fl_ativo: isBefore(parseISO(data.end_date), new Date()) ? 0 : 1,
      start_date: format(parseISO(data.start_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt
      }),
      end_date: format(parseISO(data.end_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt
      })
    }));

    yield put(Creators.listMatriculasSuccess(matriculasFormatadas));
  } catch (err) {
    toast.error("Falha na busca dos planos");
    yield put(Creators.listMatriculasFailure());
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.REQUEST_AUTH, sagasAuth),
  takeLatest(Types.LEAVE_AUTH, signLeave),
  takeLatest(Types.REQUEST_LISTSTUDENTS, listStudents),
  takeLatest(Types.REQUEST_LISTPLANOS, listPlanos),
  takeLatest(Types.REQUEST_LISTMATRICULAS, listMatriculas)
]);
