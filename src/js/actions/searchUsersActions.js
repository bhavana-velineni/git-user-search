import * as types from './actionTypes';
import { searchUsers } from '../services/userService';

export const loadAllUsers = data => {
    return {
        type: types.LOAD_ALL_USERS,
        payload: data
    }
}

export const getUserList = (searchString, perPage, currentPageNo) => {
    return (dispatch) => {
        if (searchString && searchString.trim() != '') {
            searchUsers(searchString, perPage, currentPageNo)
                .then(searchResult => dispatch(loadAllUsers(searchResult.data)));
        } else {
            dispatch(loadAllUsers(undefined));
        }
    }
};
