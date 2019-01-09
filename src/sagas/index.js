import { all, call } from 'redux-saga/effects';
import sessionSaga from './SessionSaga';
import usersSaga from './UsersSaga';
import groupsSaga from './GroupsSaga';
import searchSaga from './SearchSaga';

function* rootSaga(){
  yield all([
    call(sessionSaga),
    call(usersSaga),
    call(groupsSaga),
    call(searchSaga)
  ])
}

export default rootSaga;
