// @flow
import * as types from './actionTypes';

/********** USERS **********/
export const getUsersList = (data: Object) => ({type: types.GET_USERS_LIST_REQUEST, data});
export const getUser = (data: string) => ({type: types.GET_USER_REQUEST, data});
export const createUser = (data: Object) => ({type: types.CREATE_USER_REQUEST, data});
export const clearCurrentUser = () => ({type: types.CLEAR_CURRENT_USER});
export const clearUsersError = () => ({type: types.CLEAR_USERS_ERROR});
export const clearUsersData = () => ({type: types.CLEAR_USERS_DATA});
export const setCurrentPage = (data: number) => ({type: types.SET_CURRENT_PAGE, data});
export const setCurrentUser = (data: Object) => ({type: types.SET_CURRENT_USER, data});

/********** GROUPS **********/
export const getGroupsList = () => ({type: types.GET_GROUPS_LIST_REQUEST});
export const getGroup = (data: string) => ({type: types.GET_GROUP_REQUEST, data});
export const createGroup = (data: Object) => ({type: types.CREATE_GROUP_REQUEST, data});
export const clearCurrentGroup = () => ({type: types.CLEAR_CURRENT_GROUP});
export const clearGroupsError = () => ({type: types.CLEAR_GROUPS_ERROR});

/********** SESSION **********/
export const login = (data: Object) => ({type: types.LOGIN_REQUEST, data});
export const logout = () => ({type: types.LOGOUT_REQUEST});

/********** MODAL **********/
export const showModal = (type: string, props: Object) => ({type: types.SHOW_MODAL, payload: {type, props}});
export const hideModal = () => ({type: types.HIDE_MODAL});

/********** SEARCH **********/
export const search = (data: string) => ({type: types.SEARCH_REQUEST, data});
