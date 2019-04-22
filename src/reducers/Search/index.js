// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  results: null,
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

export default function searchReducer(state: State = initialState, action: Action): State {
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
    case types.CLEAR_SEARCH_RESULTS:
      return initialState;
    default:
      return state
  }
}
