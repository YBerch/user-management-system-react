import * as types from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

describe("actionCreators users", () => {
  it("should create an action with get users list request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.GET_USERS_LIST_REQUEST,
      data
    };

    expect(actionCreators.getUsersList(data)).toEqual(expectedAction);
  });

  it("should create an action with get user request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.GET_USER_REQUEST,
      data
    };

    expect(actionCreators.getUser(data)).toEqual(expectedAction);
  });

  it("should create an action with get groups by user request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.GET_GROUPS_BY_USER_REQUEST,
      data
    };

    expect(actionCreators.getGroupsByUser(data)).toEqual(expectedAction);
  });

  it("should create an action with remove group from user request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.REMOVE_GROUP_FROM_USER_REQUEST,
      data
    };

    expect(actionCreators.removeGroupFromUser(data)).toEqual(expectedAction);
  });

  it("should create an action with add group to user request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.ADD_GROUP_TO_USER_REQUEST,
      data
    };

    expect(actionCreators.addGroupToUser(data)).toEqual(expectedAction);
  });

  it("should create an action with create user request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.CREATE_USER_REQUEST,
      data
    };

    expect(actionCreators.createUser(data)).toEqual(expectedAction);
  });

  it("should create the 'clear current user' action", () => {
    const expectedAction = {
      type: types.CLEAR_CURRENT_USER
    };

    expect(actionCreators.clearCurrentUser()).toEqual(expectedAction);
  });

  it("should create the 'clear users error' action", () => {
    const expectedAction = {
      type: types.CLEAR_USERS_ERROR
    };

    expect(actionCreators.clearUsersError()).toEqual(expectedAction);
  });

  it("should create the 'clear users data' action", () => {
    const expectedAction = {
      type: types.CLEAR_USERS_DATA
    };

    expect(actionCreators.clearUsersData()).toEqual(expectedAction);
  });

  it("should create the 'set current page for users' action", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.SET_CURRENT_PAGE_USERS,
      data
    };

    expect(actionCreators.setCurrentPageUsers(data)).toEqual(expectedAction);
  });

  it("should create the 'set current user' action", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      data
    };

    expect(actionCreators.setCurrentUser(data)).toEqual(expectedAction);
  });

  it("should create an action with update user request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.UPDATE_USER_REQUEST,
      data
    };

    expect(actionCreators.updateUser(data)).toEqual(expectedAction);
  });

  it("should create an action with delete user request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.DELETE_USER_REQUEST,
      data
    };

    expect(actionCreators.deleteUser(data)).toEqual(expectedAction);
  });
});
