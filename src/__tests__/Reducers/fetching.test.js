import reducer from "../../reducers/Fetching";
import * as types from '../../actions/actionTypes';

const initialState = {
  isFetching: false
};

describe("fetching reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_REQUEST", () => {
    expect(
      reducer(initialState, {type: types.FETCH_REQUEST})
    ).toEqual(
      {
        isFetching: true
      }
    );
  });

  it("should handle FETCH_RECEIVE", () => {
    expect(
      reducer(initialState, {type: types.FETCH_RECEIVE})
    ).toEqual(
      {
        isFetching: false
      }
    );
  });
});
