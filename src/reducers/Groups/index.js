// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  data: {},
  error: false,
  errorMessage: '',
  currentGroup: null,
  createdGroup: false
};

type State = {
  +data: Object,
  +error: boolean,
  +errorMessage: string,
  +currentGroup: Object,
  +createdGroup: boolean
}

type Action = {
  +type: string,
  +data: Object
}

export default function groupsReducer(state: State = initialState, action: Action): State {
  const { data } = action;
  switch (action.type){
    case types.GET_GROUPS_LIST_SUCCESS:
      return {
        ...state,
        data: data,
        error: false,
        errorMessage: '',
        createdGroup: false
      };
    case types.GET_GROUPS_LIST_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data
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
    case types.CLEAR_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: null
      };
    case types.CLEAR_GROUPS_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: ""
      };
    default:
      return state
  }
}