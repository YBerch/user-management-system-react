// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  data: {},
  error: false,
  errorMessage: '',
  currentPage: 1,
  currentUser: null,
  createdUser: false,
  deletedUser: false
};

type State = {
  +data: Object,
  +error: boolean,
  +errorMessage: string,
  +currentPage: number,
  +currentUser: Object,
  +createdUser: boolean,
  +deletedUser: boolean
}

type Action = {
  +type: string,
  +data: Object
}

export default function usersReducer(state: State = initialState, action: Action): State {
  const { data } = action;

  switch (action.type){
    case types.GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...data
        },
        error: false,
        errorMessage: '',
        createdUser: false,
        deletedUser: false
      };
    case types.GET_USERS_LIST_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.SET_CURRENT_PAGE_USERS:
      return {
        ...state,
        currentPage: data
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: data
      };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: data,
        error: false,
        errorMessage: ''
      };
    case types.GET_USER_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        createdUser: true
      };
    case types.CREATE_USER_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.CLEAR_USERS_DATA:
      return {
        ...state,
        data: {}
      };
    case types.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };
    case types.CLEAR_USERS_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: ''
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: null
      };
    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        deletedUser: true
      };
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    default:
      return state
  }
}
