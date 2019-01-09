// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  results: {},
  error: false,
  errorMessage: ''
};

type State = {
  +results: Object,
  +error: boolean,
  +errorMessage: string
}

type Action = {
  +type: string,
  +data: Object
}

export default function usersReducer(state: State = initialState, action: Action): State {
  const { data } = action;

  switch (action.type){
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        results: data
      };
    case types.SEARCH_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: data.message
      };
    default:
      return state
  }
}