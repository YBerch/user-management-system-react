import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { search } from '../../api/Search';

function* searchGen(action){
  const response = yield call(search, action.data);
  const { data } = response;
  if(response.status === 200){
    yield put({type: types.SEARCH_SUCCESS, data});
  } else {
    yield put({type: types.SEARCH_FAILURE});
  }
}

function* usersSaga(){
  yield takeLatest(types.SEARCH_REQUEST, searchGen);
}

export default usersSaga;