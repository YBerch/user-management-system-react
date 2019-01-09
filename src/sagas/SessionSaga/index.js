import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { postSignIn, postSignOut } from '../../api/Session';

function* signIn(action){
  const response = yield call(postSignIn, action.data);
  if(response.status === 200){
    yield put({type: types.LOGIN_SUCCESS, data: response.data})
  } else {
    yield put({type: types.LOGIN_FAILURE, data: response.data})
  }
}

function* signOut(){
  const response = yield call(postSignOut);
  if(response.status === 200){
    yield put({type: types.LOGOUT_SUCCESS});
  } else {
    yield put({type: types.LOGOUT_FAILURE});
  }
}

function* sessionSaga(){
  yield takeLatest(types.LOGIN_REQUEST, signIn);
  yield takeLatest(types.LOGOUT_REQUEST, signOut);
}

export default sessionSaga;
