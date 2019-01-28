import * as types from '../../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getGroupsList, getGroup, postCreateGroup, patchUpdateGroup, deleteGroup } from '../../api/Groups';
import { getUsersList } from '../../api/Users';

function* getGroupsListGen(action){
  yield put({type: types.FETCH_REQUEST});
  const response = yield call(getGroupsList, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_GROUPS_LIST_SUCCESS, data})
  } else {
    yield put({type: types.GET_GROUPS_LIST_FAILURE, data})
  }
  yield put({type: types.FETCH_RECEIVE});
}

function* getGroupGen(action){
  yield put({type: types.FETCH_REQUEST});
  const response = yield call(getGroup, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_GROUP_SUCCESS, data});
  } else {
    yield put({type: types.GET_GROUP_FAILURE, data});
  }
  yield put({type: types.FETCH_RECEIVE});
}

function* getUsersByGroup(action){
  yield put({type: types.FETCH_REQUEST});
  const response = yield call(getUsersList, action.data);
  const { data } = response;

  if(response.status === 200){
    yield put({type: types.GET_USERS_BY_GROUP_SUCCESS, data, groupId: action.data.groupId});
  } else {
    yield put({type: types.GET_USERS_BY_GROUP_FAILURE, data});
  }
  yield put({type: types.FETCH_RECEIVE});
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

function* deleteGroupGen(action){
  const response = yield call(deleteGroup, action.data);

  const { data } = response;

  if(response.status === 200){
    yield put({type: types.DELETE_GROUP_SUCCESS, data});
  } else {
    yield put({type: types.DELETE_GROUP_FAILURE, data});
  }
}

function* groupsSaga(){
  yield takeLatest(types.GET_GROUPS_LIST_REQUEST, getGroupsListGen);
  yield takeLatest(types.GET_GROUP_REQUEST, getGroupGen);
  yield takeLatest(types.GET_USERS_BY_GROUP_REQUEST, getUsersByGroup);
  yield takeLatest(types.CREATE_GROUP_REQUEST, createGroup);
  yield takeLatest(types.UPDATE_GROUP_REQUEST, updateGroup);
  yield takeLatest(types.DELETE_GROUP_REQUEST, deleteGroupGen)
}

export default groupsSaga;