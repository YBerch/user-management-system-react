import reducer from "../../reducers/Search";
import * as types from '../../actions/actionTypes';

const initialState = {
  results: null,
  error: false,
  errorMessage: ''
};

describe("users reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SEARCH_SUCCESS", () => {
    const data = {users: [{name: 'some name'}, {name: 'another name'}], groups: [{name: 'some name'}, {name: 'another name'}]};
    expect(
      reducer(initialState, {type: types.SEARCH_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        results: data
      }
    );
  });

  it("should handle SEARCH_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.SEARCH_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle CLEAR_SEARCH_RESULTS", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.CLEAR_SEARCH_RESULTS, data})).toEqual(initialState);
  });
});
