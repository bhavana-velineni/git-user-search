import * as types from './actionTypes';
import { searchUsers } from '../services/userService';

export const loadAllUsers = data => {
    return {
        type: types.LOAD_ALL_USERS,
        payload: data
    }
}

export const getUserList = (searchString) => {
    return (dispatch) => searchUsers(searchString)
            .then(searchResult => dispatch(loadAllUsers(searchResult.data)));
};