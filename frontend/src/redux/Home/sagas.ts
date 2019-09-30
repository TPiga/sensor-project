import { call, put, takeEvery } from 'redux-saga/effects';
import { getNumberOfMessages } from './actions';
import { INumberOfMessages } from './types';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';

export function* updateNumberOfMessagesSaga(
  action: ActionType<typeof getNumberOfMessages.request>,
) {
  const response: INumberOfMessages = yield call([client, client.makeNumberOfMessagesRequest]);

  yield put(getNumberOfMessages.success(response));
}

export default function* homeSagas() {
  yield takeEvery(getType(getNumberOfMessages.request), updateNumberOfMessagesSaga);
}
