import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUsersList,
  getUser,
  postCreateUser,
  patchUpdateUser,
  deleteUser,
  deleteGroupFromUser,
  putGroupToUser
} from '../../api/Users';
import { getGroupsList } from '../../api/Groups';

function* getUsersListGen(action){
  yield put({type: types.FETCH_REQUEST});
  const response = yield call(getUsersList, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_USERS_LIST_SUCCESS, data});
  } else {
    yield put({type: types.GET_USERS_LIST_FAILURE, data});
  }
  yield put({type: types.FETCH_RECEIVE});
}

function* getUserGen(action){
  yield put({type: types.FETCH_REQUEST});
  const response = yield call(getUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_USER_SUCCESS, data});
  } else {
    yield put({type: types.GET_USER_FAILURE, data});
  }
  yield put({type: types.FETCH_RECEIVE});
}

function* getGroupsByUser(action){
  yield put({type: types.FETCH_REQUEST});
  const response = yield call(getGroupsList, action.data.groups);
  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_GROUPS_BY_USER_SUCCESS, data, userId: action.data.id});
  } else {
    yield put({type: types.GET_GROUPS_BY_USER_FAILURE, data});
  }
  yield put({type: types.FETCH_RECEIVE});
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
    yield put({type: types.REMOVE_GROUP_FROM_USER_SUCCESS, data, groupId: action.data.groupId});
  } else {
    yield put({type: types.REMOVE_GROUP_FROM_USER_FAILURE, data});
  }
}

function* addGroupToUser(action) {
  const response = yield call(putGroupToUser, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.ADD_GROUP_TO_USER_SUCCESS, data, groupId: action.data.groupId});
  } else {
    yield put({type: types.ADD_GROUP_TO_USER_FAILURE, data});
  }
}

function* usersSaga(){
  yield takeLatest(types.GET_USERS_LIST_REQUEST, getUsersListGen);
  yield takeLatest(types.GET_USER_REQUEST, getUserGen);
  yield takeLatest(types.GET_GROUPS_BY_USER_REQUEST, getGroupsByUser);
  yield takeLatest(types.CREATE_USER_REQUEST, createUser);
  yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUserGen);
  yield takeLatest(types.REMOVE_GROUP_FROM_USER_REQUEST, removeGroupFromUser);
  yield takeLatest(types.ADD_GROUP_TO_USER_REQUEST, addGroupToUser)
}

export default usersSaga;