import * as types from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

describe("actionCreators session", () => {
  it("should create an action with login request", () => {
    const data = {login: 'some string', password: 'another string'};
    const expectedAction = {
      type: types.LOGIN_REQUEST,
      data
    };

    expect(actionCreators.login(data)).toEqual(expectedAction);
  });

  it("should create an action with logout request", () => {
    const expectedAction = {
      type: types.LOGOUT_REQUEST
    };

    expect(actionCreators.logout()).toEqual(expectedAction);
  });

  it("should create the 'clear session error' action", () => {
    const expectedAction = {
      type: types.CLEAR_SESSION_ERROR
    };

    expect(actionCreators.clearSessionError()).toEqual(expectedAction);
  });
});
