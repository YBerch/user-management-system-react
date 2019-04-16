// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  authorize: false,
  user: {},
  error: false,
  errorMessage: ''
};

type State = {
  authorize: boolean,
  user: Object,
  error: boolean,
  errorMessage: string
}

type Action = {
  type: string,
  data: Object
}

export default function sessionReducer(state: State = initialState, action: Action): State {
  const { data } = action;

  switch (action.type){
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authorize: true,
        user: data,
        error: false,
        errorMessage: ''
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authorize: false,
        user: {},
        error: true,
        errorMessage: data.message
      };
    case types.CLEAR_SESSION_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: ''
      };
    default:
      return state
  }
}
