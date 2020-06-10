

import axios from 'axios';

const githubApi = axios.create({
    baseURL: 'https://api.github.com/',
});

export const searchUsers = (searchString, perPage, currentPageNo) => {
    const queryParams = {
        'q': searchString,
        'per_page': perPage,
        'page': currentPageNo
    };
    return githubApi.get('/search/users', { params: queryParams })
};
