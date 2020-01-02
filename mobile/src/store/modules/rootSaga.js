import { all } from "redux-saga/effects";

import Sagas from "./ducks/sagas";

export default function* rootSaga() {
  return yield all([Sagas]);
}
