import { format, isBefore, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';
// import history from "~/services/history";
import { Creators, Types } from './reducers';

export function* sagasAuth({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(
      api.post,
      `/students/mobile-authenticate/${id}`,
    );

    const { student } = response.data;

    if (response.data.status === 'error') {
      return Alert.alert(response.data.msg);
    }

    yield put(Creators.signInSuccess(student));
  } catch (err) {
    Alert.alert('Falha na autenticação, verifique seus dados');
    yield put(Creators.signFailure());
  }
}

export default all([takeLatest(Types.REQUEST_AUTH, sagasAuth)]);
