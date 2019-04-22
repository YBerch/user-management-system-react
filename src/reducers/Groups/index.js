// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  data: {},
  groupUsers: {},
  error: false,
  errorMessage: '',
  currentPage: 1,
  currentGroup: null,
  createdGroup: false,
  deletedGroup: false
};

type State = {
  +data: Object,
  +groupUsers: Object,
  +error: boolean,
  +errorMessage: string,
  +currentPage: number,
  +currentGroup: Object,
  +createdGroup: boolean,
  +deletedGroup: boolean
}

type Action = {
  +type: string,
  +data: Object,
  +groupId: string
}

export default function groupsReducer(state: State = initialState, action: Action): State {
  const { data } = action;

  switch (action.type){
    case types.GET_GROUPS_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...data
        },
        error: false,
        errorMessage: '',
        createdGroup: false,
        deletedGroup: false
      };
    case types.GET_GROUPS_LIST_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.SET_CURRENT_PAGE_GROUPS:
      return {
        ...state,
        currentPage: data
      };
    case types.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: data
      };
    case types.GET_GROUP_SUCCESS:
      return {
        ...state,
        currentGroup: data,
        error: false,
        errorMessage: ''
      };
    case types.GET_GROUP_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.GET_USERS_BY_GROUP_SUCCESS:
      return {
        ...state,
        groupUsers: {
          ...state.groupUsers,
          [action.groupId]: data
        }
      };
    case types.ADD_GROUP_TO_USER_SUCCESS:
    case types.REMOVE_GROUP_FROM_USER_SUCCESS:
      return {
        ...state,
        groupUsers: {
          ...state.groupUsers,
          [action.groupId]: null
        }
      };
    case types.CLEAR_USERS_DATA:
      return {
        ...state,
        groupUsers: {}
      };
    case types.GET_USERS_BY_GROUP_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };

    case types.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        createdGroup: true
      };
    case types.CREATE_GROUP_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.CLEAR_GROUPS_DATA:
      return {
        ...state,
        data: {},
        currentGroup: null,
        groupUsers: {}
      };
    case types.CLEAR_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: null
      };
    case types.CLEAR_GROUPS_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: ''
      };
    case types.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        currentGroup: null
      };
    case types.UPDATE_GROUP_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        deletedGroup: true
      };
    case types.DELETE_GROUP_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    default:
      return state
  }
}