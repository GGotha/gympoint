import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';

import { Creators, Types } from './reducers';

export function* sagasAuth({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(
      api.post,
      `/students/mobile-authenticate/${id}`,
    );

    const { student } = response.data;

    yield put(Creators.signInSuccess(student));
  } catch (err) {
    Alert.alert('Falha na autenticação, verifique seus dados');
    yield put(Creators.signFailure());
  }
}

export function* listCheckins({ payload }) {
  try {
    const studentId = payload.id;

    const response = yield call(api.get, `/students/${studentId}/checkins`);

    const checkins = response.data;

    if (response.data.status === 'error') {
      return Alert.alert(response.data.msg);
    }

    yield put(Creators.listCheckinsSuccess(checkins));
  } catch (err) {
    Alert.alert('Falha na busca dos checkins');
    yield put(Creators.listCheckinsFailure());
  }
}

export function* listHelpOrders({ payload }) {
  try {
    const studentId = payload.id;

    const response = yield call(api.get, `/students/${studentId}/help-orders`);

    const helpOrders = response.data;

    if (response.data.status === 'error') {
      return Alert.alert(response.data.msg);
    }

    yield put(Creators.listHelpOrdersSuccess(helpOrders));
  } catch (err) {
    Alert.alert('Falha na busca das help orders');
    yield put(Creators.listHelpOrdersFailure());
  }
}

export default all([
  takeLatest(Types.REQUEST_AUTH, sagasAuth),
  takeLatest(Types.REQUEST_CHECKIN, listCheckins),
  takeLatest(Types.REQUEST_HELPORDER, listHelpOrders),
]);
