import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUsersList,
  getUser,
  postCreateUser,
  patchUpdateUser,
  deleteUser,
  deleteGroupFromUser } from '../../api/Users';
import { getGroupsList } from '../../api/Groups';

function* getUsersListGen(action){
  const response = yield call(getUsersList, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_USERS_LIST_SUCCESS, data});
  } else {
    yield put({type: types.GET_USERS_LIST_FAILURE, data});
  }
}

function* getUserGen(action){
  const response = yield call(getUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_USER_SUCCESS, data});
  } else {
    yield put({type: types.GET_USER_FAILURE, data});
  }
}

function* getGroupsByUser(action){
  const response = yield call(getGroupsList, action.data.groups);
  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_GROUPS_BY_USER_SUCCESS, data, userId: action.data.id});
  } else {
    yield put({type: types.GET_GROUPS_BY_USER_FAILURE, data});
  }
}

function* createUser(action){
  const response = yield call(postCreateUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.CREATE_USER_SUCCESS, data});
  } else {
    yield put({type: types.CREATE_USER_FAILURE, data});
  }
}

function* updateUser(action){
  const response = yield call(patchUpdateUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.UPDATE_USER_SUCCESS, data});
  } else {
    yield put({type: types.UPDATE_USER_FAILURE, data});
  }
}

function* deleteUserGen(action){
  const response = yield call(deleteUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.DELETE_USER_SUCCESS, data});
  } else {
    yield put({type: types.DELETE_USER_FAILURE, data});
  }
}

function* removeGroupFromUser(action) {
  const response = yield call(deleteGroupFromUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.REMOVE_GROUP_FROM_USER_SUCCESS, data});
  } else {
    yield put({type: types.REMOVE_GROUP_FROM_USER_FAILURE, data});
  }
}

function* usersSaga(){
  yield takeLatest(types.GET_USERS_LIST_REQUEST, getUsersListGen);
  yield takeLatest(types.GET_USER_REQUEST, getUserGen);
  yield takeLatest(types.GET_GROUPS_BY_USER_REQUEST, getGroupsByUser);
  yield takeLatest(types.CREATE_USER_REQUEST, createUser);
  yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUserGen);
  yield takeLatest(types.REMOVE_GROUP_FROM_USER_REQUEST, removeGroupFromUser)
}

export default usersSaga;