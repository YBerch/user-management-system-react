import reducer from "../../reducers/Groups";
import * as types from '../../actions/actionTypes';

const initialState = {
  data: {},
  groupUsers: {},
  error: false,
  errorMessage: '',
  currentPage: 1,
  currentGroup: null,
  createdGroup: false,
  deletedGroup: false
};

describe("groups reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_GROUPS_LIST_SUCCESS", () => {
    const data = {list: [{name: 'some name'}, {name: 'another name'}], anotherData: 'some data'};
    expect(
      reducer(initialState, {type: types.GET_GROUPS_LIST_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        data: {
          ...initialState.data,
          ...data
        },
        error: false,
        errorMessage: '',
        createdGroup: false,
        deletedGroup: false
      }
    );
  });

  it("should handle GET_GROUPS_LIST_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.GET_GROUPS_LIST_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle SET_CURRENT_PAGE_GROUPS", () => {
    const data = 5;
    expect(
      reducer(initialState, {type: types.SET_CURRENT_PAGE_GROUPS, data})
    ).toEqual(
      {
        ...initialState,
        currentPage: data
      }
    );
  });

  it("should handle SET_CURRENT_GROUP", () => {
    const data = {name: 'some name'};
    expect(
      reducer(initialState, {type: types.SET_CURRENT_GROUP, data})
    ).toEqual(
      {
        ...initialState,
        currentGroup: data
      }
    );
  });

  it("should handle GET_GROUP_SUCCESS", () => {
    const data = {name: 'some name'};
    expect(
      reducer(initialState, {type: types.GET_GROUP_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        currentGroup: data,
        error: false,
        errorMessage: ''
      }
    );
  });

  it("should handle GET_GROUP_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.GET_GROUP_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle GET_USERS_BY_GROUP_SUCCESS", () => {
    const groupId = 'someId';
    const data = ['someUserId', 'anotherUserId'];
    expect(
      reducer(initialState, {type: types.GET_USERS_BY_GROUP_SUCCESS, groupId, data})
    ).toEqual(
      {
        ...initialState,
        groupUsers: {
          ...initialState.groupUsers,
          [groupId]: data
        }
      }
    );
  });

  it("should handle ADD_GROUP_TO_USER_SUCCESS", () => {
    const groupId = 'someId';
    const state = {someId: ['user1', 'user2']}
    expect(
      reducer(initialState, {type: types.ADD_GROUP_TO_USER_SUCCESS, groupId})
    ).toEqual(
      {
        ...initialState,
        groupUsers: {
          ...initialState.groupUsers,
          ...state,
          [groupId]: null
        }
      }
    );
  });

  it("should handle REMOVE_GROUP_FROM_USER_SUCCESS", () => {
    const groupId = 'someId';
    const state = {someId: ['user1', 'user2']};
    expect(
      reducer(initialState, {type: types.REMOVE_GROUP_FROM_USER_SUCCESS, groupId})
    ).toEqual(
      {
        ...initialState,
        groupUsers: {
          ...initialState.groupUsers,
          ...state,
          [groupId]: null
        }
      }
    );
  });

  it("should handle CLEAR_USERS_DATA", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_USERS_DATA})
    ).toEqual(
      {
        ...initialState,
        groupUsers: {}
      }
    );
  });

  it("should handle GET_USERS_BY_GROUP_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.GET_USERS_BY_GROUP_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle CREATE_GROUP_SUCCESS", () => {
    expect(
      reducer(initialState, {type: types.CREATE_GROUP_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        createdGroup: true
      }
    );
  });

  it("should handle CREATE_GROUP_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.CREATE_GROUP_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle CLEAR_GROUPS_DATA", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_GROUPS_DATA})
    ).toEqual(
      {
        ...initialState,
        data: {},
        currentGroup: null,
        groupUsers: {}
      }
    );
  });

  it("should handle CLEAR_CURRENT_GROUP", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_CURRENT_GROUP})
    ).toEqual(
      {
        ...initialState,
        currentGroup: null
      }
    );
  });

  it("should handle CLEAR_GROUPS_ERROR", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_GROUPS_ERROR})
    ).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: ''
      }
    );
  });

  it("should handle UPDATE_GROUP_SUCCESS", () => {
    expect(
      reducer(initialState, {type: types.UPDATE_GROUP_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        currentGroup: null
      }
    );
  });

  it("should handle UPDATE_GROUP_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.UPDATE_GROUP_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle DELETE_GROUP_SUCCESS", () => {
    expect(
      reducer(initialState, {type: types.DELETE_GROUP_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        deletedGroup: true
      }
    );
  });

  it("should handle DELETE_GROUP_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.DELETE_GROUP_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });
});
