

import axios from 'axios';

const githubApi = axios.create({
    baseURL: 'https://api.github.com/',
});

export const searchUsers = (searchString) => {
    const queryParams = {
        'q': searchString,
    };
    return githubApi.get('/search/users', { params: queryParams })
};
