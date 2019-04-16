import reducer from "../../reducers/Users";
import * as types from '../../actions/actionTypes';

const initialState = {
  data: {},
  usersGroups: {},
  error: false,
  errorMessage: '',
  currentPage: 1,
  currentUser: null,
  createdUser: false,
  deletedUser: false,
  addedGroup: false
};

describe("users reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_USERS_LIST_SUCCESS", () => {
    const data = {list: [{name: 'some name'}, {name: 'another name'}], anotherData: 'some data'};
    expect(
      reducer(initialState, {type: types.GET_USERS_LIST_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        data: {
          ...initialState.data,
          ...data
        },
        error: false,
        errorMessage: '',
        createdUser: false,
        deletedUser: false
      }
    );
  });

  it("should handle GET_USERS_LIST_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.GET_USERS_LIST_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle SET_CURRENT_PAGE_USERS", () => {
    const data = 5;
    expect(
      reducer(initialState, {type: types.SET_CURRENT_PAGE_USERS, data})
    ).toEqual(
      {
        ...initialState,
        currentPage: data
      }
    );
  });

  it("should handle SET_CURRENT_USER", () => {
    const data = {name: 'some name'};
    expect(
      reducer(initialState, {type: types.SET_CURRENT_USER, data})
    ).toEqual(
      {
        ...initialState,
        currentUser: data
      }
    );
  });

  it("should handle GET_USER_SUCCESS", () => {
    const data = {name: 'some name'};
    expect(
      reducer(initialState, {type: types.GET_USER_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        currentUser: data,
        addedGroup: false,
        error: false,
        errorMessage: ''
      }
    );
  });

  it("should handle GET_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.GET_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle GET_GROUPS_BY_USER_SUCCESS", () => {
    const userId = 'someId';
    const data = ['someGroupId', 'anotherGroupId'];
    expect(
      reducer(initialState, {type: types.GET_GROUPS_BY_USER_SUCCESS, userId, data})
    ).toEqual(
      {
        ...initialState,
        usersGroups: {
          ...initialState.usersGroups,
          [userId]: data
        }
      }
    );
  });

  it("should handle GET_GROUPS_BY_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.GET_GROUPS_BY_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle REMOVE_GROUP_FROM_USER_SUCCESS", () => {
    const data = {userId: ['someGroupId', 'anotherGroupId']};
    expect(
      reducer(initialState, {type: types.REMOVE_GROUP_FROM_USER_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        usersGroups: {
          ...initialState.usersGroups,
          [data.userId]: null
        }
      }
    );
  });

  it("should handle REMOVE_GROUP_FROM_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.REMOVE_GROUP_FROM_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle ADD_GROUP_TO_USER_SUCCESS", () => {
    const data = {userId: ['someGroupId', 'anotherGroupId']};
    expect(
      reducer(initialState, {type: types.ADD_GROUP_TO_USER_SUCCESS, data})
    ).toEqual(
      {
        ...initialState,
        addedGroup: true,
        usersGroups: {
          ...initialState.usersGroups,
          [data.userId]: null
        }
      }
    );
  });

  it("should handle ADD_GROUP_TO_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.ADD_GROUP_TO_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle CREATE_USER_SUCCESS", () => {
    expect(
      reducer(initialState, {type: types.CREATE_USER_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        createdUser: true
      }
    );
  });

  it("should handle CREATE_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.CREATE_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle CLEAR_USERS_DATA", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_USERS_DATA})
    ).toEqual(
      {
        ...initialState,
        data: {},
        currentUser: null,
        usersGroups: {}
      }
    );
  });

  it("should handle CLEAR_GROUPS_DATA", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_GROUPS_DATA})
    ).toEqual(
      {
        ...initialState,
        currentUser: null,
        usersGroups: {}
      }
    );
  });

  it("should handle CLEAR_CURRENT_USER", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_CURRENT_USER})
    ).toEqual(
      {
        ...initialState,
        currentUser: null
      }
    );
  });

  it("should handle CLEAR_USERS_ERROR", () => {
    expect(
      reducer(initialState, {type: types.CLEAR_USERS_ERROR})
    ).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: ''
      }
    );
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      reducer(initialState, {type: types.UPDATE_USER_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        currentUser: null
      }
    );
  });

  it("should handle UPDATE_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.UPDATE_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });

  it("should handle DELETE_USER_SUCCESS", () => {
    expect(
      reducer(initialState, {type: types.DELETE_USER_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        deletedUser: true
      }
    );
  });

  it("should handle DELETE_USER_FAILURE", () => {
    const data = {message: 'some string'};
    expect(
      reducer(initialState, {type: types.DELETE_USER_FAILURE, data})
    ).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: data.message
      }
    );
  });
});
