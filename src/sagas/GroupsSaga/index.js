import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getGroupsList, getGroup, postCreateGroup, patchUpdateGroup } from '../../api/Groups';
import {patchUpdateUser} from "../../api/Users";

function* getGroupsListGen(action){
  const response = yield call(getGroupsList, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_GROUPS_LIST_SUCCESS, data})
  } else {
    yield put({type: types.GET_GROUPS_LIST_FAILURE, data})
  }
}

function* getGroupGen(action){
  const response = yield call(getGroup, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_GROUP_SUCCESS, data});
  } else {
    yield put({type: types.GET_GROUP_FAILURE, data});
  }
}

function* createGroup(action){
  const response = yield call(postCreateGroup, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.CREATE_GROUP_SUCCESS, data});
  } else {
    yield put({type: types.CREATE_GROUP_FAILURE, data});
  }
}

function* updateGroup(action){
  const response = yield call(patchUpdateGroup, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.UPDATE_GROUP_SUCCESS, data});
  } else {
    yield put({type: types.UPDATE_GROUP_FAILURE, data});
  }
}

function* groupsSaga(){
  yield takeLatest(types.GET_GROUPS_LIST_REQUEST, getGroupsListGen);
  yield takeLatest(types.GET_GROUP_REQUEST, getGroupGen);
  yield takeLatest(types.CREATE_GROUP_REQUEST, createGroup);
  yield takeLatest(types.UPDATE_GROUP_REQUEST, updateGroup);
}

export default groupsSaga;