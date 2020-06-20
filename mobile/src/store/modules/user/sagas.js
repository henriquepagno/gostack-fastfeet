import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { signInSuccess, signFailure, signOut } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* getUser({ payload }) {
  if (!payload.user.profile) {
    return;
  }

  const { user } = payload.user.profile;

  try {
    yield call(api.get, `/deliverymen/${user.id}`);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      yield put(signOut());
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', getUser),
  takeLatest('@user/SIGN_IN_REQUEST', signIn),
]);
