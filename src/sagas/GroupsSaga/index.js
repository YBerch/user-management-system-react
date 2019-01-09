import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getGroupsList, getGroup, postCreateGroup } from '../../api/Groups';

function* getGroupsListGen(){
  const response = yield call(getGroupsList);

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

function* groupsSaga(){
  yield takeLatest(types.GET_GROUPS_LIST_REQUEST, getGroupsListGen);
  yield takeLatest(types.GET_GROUP_REQUEST, getGroupGen);
  yield takeLatest(types.CREATE_GROUP_REQUEST, createGroup);
}

export default groupsSaga;