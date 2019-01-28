// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  isFetching: false
};

type State = {
  isFetching: boolean
}

type Action = {
  type: string
}

export default function fetchingReducer(state: State = initialState, action: Action): State {
  switch (action.type){
    case types.FETCH_REQUEST:
      return {
        isFetching: true
      };
    case types.FETCH_RECEIVE:
      return {
        isFetching: false
      };
    default:
      return state
  }
}
