
import * as types from '../actions/actionTypes';

const searchUsers = (state = {}, action) => {
    switch (action.type) {
        case types.LOAD_ALL_USERS:
            return {
                ...state,
                userList: action.payload
            };
        default:
            return state;
    }
};

export default searchUsers;
