# git-user-search
Simple app to search an user in github and display all the relevant details.

Know about user's profile just by searching with username!!

# See it in Action

Application is hosted on Netlify at https://git-user-search.netlify.app/

# Running locally

- Clone the repository
- *yarn install*
- *yarn start* - Runs the app in the development mode.

 Vist http://localhost:9000/ in the browser!!

# Deployment

*yarn build* - Builds the app for production to the `dist` folder.

Your app is ready to be deployed to [netlify](https://www.netlify.com/)

# API

https://api.github.com/search/users

**Query Parameters**
- q - search string
- per_page - no of users you want to display per page. Default is 30.
- page - page number that you are on

More information at : https://docs.github.com/en/rest/reference/users



