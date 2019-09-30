import { all } from 'redux-saga/effects';

import { sagas as homeSagas } from 'redux/Home';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([homeSagas()]);
}
