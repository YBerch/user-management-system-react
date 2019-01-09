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
  switch (action.type){
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authorize: true,
        user: action.data,
        error: false,
        errorMessage: ''
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authorize: false,
        user: {},
        error: true,
        errorMessage: action.data.message
      };
    default:
      return state
  }
}