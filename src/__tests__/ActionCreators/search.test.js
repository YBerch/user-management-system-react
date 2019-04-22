import * as types from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

describe("actionCreators search", () => {
  it("should create an action with search request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.SEARCH_REQUEST,
      data
    };

    expect(actionCreators.search(data)).toEqual(expectedAction);
  });

  it("should create the 'clear search results' action", () => {
    const expectedAction = {
      type: types.CLEAR_SEARCH_RESULTS
    };

    expect(actionCreators.clearSearchResults()).toEqual(expectedAction);
  });
});
