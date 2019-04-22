import * as types from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

describe("actionCreators groups", () => {
  it("should create an action with get groups list request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.GET_GROUPS_LIST_REQUEST,
      data
    };

    expect(actionCreators.getGroupsList(data)).toEqual(expectedAction);
  });

  it("should create an action with get group request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.GET_GROUP_REQUEST,
      data
    };

    expect(actionCreators.getGroup(data)).toEqual(expectedAction);
  });

  it("should create an action with get users by group request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.GET_USERS_BY_GROUP_REQUEST,
      data
    };

    expect(actionCreators.getUsersByGroup(data)).toEqual(expectedAction);
  });

  it("should create an action with create group request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.CREATE_GROUP_REQUEST,
      data
    };

    expect(actionCreators.createGroup(data)).toEqual(expectedAction);
  });

  it("should create the 'clear current group' action", () => {
    const expectedAction = {
      type: types.CLEAR_CURRENT_GROUP
    };

    expect(actionCreators.clearCurrentGroup()).toEqual(expectedAction);
  });

  it("should create the 'clear groups error' action", () => {
    const expectedAction = {
      type: types.CLEAR_GROUPS_ERROR
    };

    expect(actionCreators.clearGroupsError()).toEqual(expectedAction);
  });

  it("should create the 'clear groups data' action", () => {
    const expectedAction = {
      type: types.CLEAR_GROUPS_DATA
    };

    expect(actionCreators.clearGroupsData()).toEqual(expectedAction);
  });

  it("should create the 'set current page for groups' action", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.SET_CURRENT_PAGE_GROUPS,
      data
    };

    expect(actionCreators.setCurrentPageGroups(data)).toEqual(expectedAction);
  });

  it("should create the 'set current group' action", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.SET_CURRENT_GROUP,
      data
    };

    expect(actionCreators.setCurrentGroup(data)).toEqual(expectedAction);
  });

  it("should create an action with update group request", () => {
    const data = {prop: 'some data'};
    const expectedAction = {
      type: types.UPDATE_GROUP_REQUEST,
      data
    };

    expect(actionCreators.updateGroup(data)).toEqual(expectedAction);
  });

  it("should create an action with delete group request", () => {
    const data = 'some data';
    const expectedAction = {
      type: types.DELETE_GROUP_REQUEST,
      data
    };

    expect(actionCreators.deleteGroup(data)).toEqual(expectedAction);
  });
});
