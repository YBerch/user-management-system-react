import reducer from "../../reducers/Session";
import * as types from '../../actions/actionTypes';

const initialState = {
  authorize: false,
  user: {},
  error: false,
  errorMessage: ''
};

describe("session reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGIN_SUCCESS", () => {
    const data = {name: 'some name'};
    expect(
      reducer(initialState, {type: types.LOGIN_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        authorize: true,
        user: data,
        error: false,
        errorMessage: ''
      }
    );
  });

  it("should handle LOGIN_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.LOGIN_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        authorize: false,
        user: {},
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle CLEAR_SESSION_ERROR", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_SESSION_ERROR})
    ).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: ''
      }
    );
  });
});
