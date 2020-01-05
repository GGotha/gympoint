import { format, isBefore, parseISO } from "date-fns";
import { pt } from "date-fns/locale";
import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "~/services/api";
import history from "~/services/history";
import { Creators, Types } from "./reducers";

export function* sagasAuth({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "/users/authenticate", {
      email,
      password
    });

    if (response.data.status === "error") {
      throw new Error();
    }

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(Creators.signInSuccess(token, user));

    history.push("/alunos");
  } catch (err) {
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

export function* listPlanosDeAuxilio() {
  try {
    const response = yield call(api.get, "help-orders");

    const helpOrders = response.data;

    if (response.data.status === "error") {
      return toast.error(response.data.msg);
    }

    yield put(Creators.listPlanosDeAuxilioSuccess(helpOrders));
  } catch (err) {
    toast.error("Falha na busca dos alunos");
    yield put(Creators.listPlanosDeAuxilioFailure());
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.REQUEST_AUTH, sagasAuth),
  takeLatest(Types.LEAVE_AUTH, signLeave),
  takeLatest(Types.REQUEST_LISTSTUDENTS, listStudents),
  takeLatest(Types.REQUEST_LISTPLANOS, listPlanos),
  takeLatest(Types.REQUEST_LISTMATRICULAS, listMatriculas),
  takeLatest(Types.REQUEST_LISTPLANOSDEAUXILIO, listPlanosDeAuxilio)
]);
