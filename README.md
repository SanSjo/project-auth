# Project Auth
An build API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once you're logged in.

Made of two parts; a backend API, and a React frontend. A User model is creted using mongoose, with properties for the registered user, and to store a user's access token.

On the frontend side of things, a registration form is build which POSTs to the API. The access token is stores to get back in the browser using local storage, and then use that token when making other requests to your API.

Once a user is logged in, there is a final endpoint which returns some content which only logged-in users should be able to access.

# View it live
Heroku https://authorisation-app.herokuapp.com

Netlify https://project-auth.netlify.com/

# The problem
We worked in teams (one located on Bali!) with one coding and one driving. The problems was to tie it all together with the different endpoints but with help from google and classmates we solved the problem
