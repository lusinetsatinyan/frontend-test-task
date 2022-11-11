import { all, fork } from "redux-saga/effects";

import todoSaga from "./events/sagas";

export function* rootSaga() {
  yield all([fork(todoSaga)]);
}