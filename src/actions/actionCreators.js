// @flow
import * as types from './actionTypes';

/********** USERS **********/
export const getUsersList = (data: Object) => ({type: types.GET_USERS_LIST_REQUEST, data});
export const getUser = (data: string) => ({type: types.GET_USER_REQUEST, data});
export const getGroupsByUser = (data: Object) => ({type: types.GET_GROUPS_BY_USER_REQUEST, data});
export const removeGroupFromUser = (data: string) => ({type: types.REMOVE_GROUP_FROM_USER_REQUEST, data});
export const addGroupToUser = (data: string) => ({type: types.ADD_GROUP_TO_USER_REQUEST, data});
export const createUser = (data: Object) => ({type: types.CREATE_USER_REQUEST, data});
export const clearCurrentUser = () => ({type: types.CLEAR_CURRENT_USER}); // redundant
export const clearUsersError = () => ({type: types.CLEAR_USERS_ERROR});
export const clearUsersData = () => ({type: types.CLEAR_USERS_DATA});
export const setCurrentPageUsers = (data: number) => ({type: types.SET_CURRENT_PAGE_USERS, data});
export const setCurrentUser = (data: Object) => ({type: types.SET_CURRENT_USER, data});
export const updateUser = (data: Object) => ({type: types.UPDATE_USER_REQUEST, data});
export const deleteUser = (data: string) => ({type: types.DELETE_USER_REQUEST, data});

/********** GROUPS **********/
export const getGroupsList = (data: Object) => ({type: types.GET_GROUPS_LIST_REQUEST, data});
export const getGroup = (data: string) => ({type: types.GET_GROUP_REQUEST, data});
export const getUsersByGroup = (data: Object) => ({type: types.GET_USERS_BY_GROUP_REQUEST, data});
export const createGroup = (data: Object) => ({type: types.CREATE_GROUP_REQUEST, data});
export const clearCurrentGroup = () => ({type: types.CLEAR_CURRENT_GROUP}); // redundant
export const clearGroupsError = () => ({type: types.CLEAR_GROUPS_ERROR});
export const clearGroupsData = () => ({type: types.CLEAR_GROUPS_DATA}); // redundant
export const setCurrentPageGroups = (data: number) => ({type: types.SET_CURRENT_PAGE_GROUPS, data});
export const setCurrentGroup = (data: Object) => ({type: types.SET_CURRENT_GROUP, data});
export const updateGroup = (data: Object) => ({type: types.UPDATE_GROUP_REQUEST, data});
export const deleteGroup = (data: string) => ({type: types.DELETE_GROUP_REQUEST, data});

/********** SESSION **********/
export const login = (data: Object) => ({type: types.LOGIN_REQUEST, data});
export const logout = () => ({type: types.LOGOUT_REQUEST});
export const clearSessionError = () => ({type: types.CLEAR_SESSION_ERROR});

/********** MODAL **********/
export const showModal = (type: string, props: Object) => ({type: types.SHOW_MODAL, payload: {type, props}});
export const hideModal = () => ({type: types.HIDE_MODAL});

/********** SEARCH **********/
export const search = (data: string) => ({type: types.SEARCH_REQUEST, data});
export const clearSearchResults = () => ({type: types.CLEAR_SEARCH_RESULTS});
