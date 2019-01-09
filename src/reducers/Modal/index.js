// @flow
import * as types from '../../actions/actionTypes';

const initialState = {
  type: '',
  props: {}
};

type State = {
  type: string,
  props: Object
}

type Action = {
  type: string,
  payload: Object
}

function modalReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        type: action.payload.type,
        props: action.payload.props
      };
    case types.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;
