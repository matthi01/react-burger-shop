
To run locally: 
- Navigate to project folder
- Run "npm install" in the project folder
- Run "npm start" to view the project

Production version of the app is available at: https://react-burger-shop-5c0c7.firebaseapp.com/

The Burger Shop app is a single page application with a multi page feeling. It was a good way to get started and learn the basics up to the advanced details of React and Redux. 
The application allows you to piece together a burger order, place the order with detailed order information after signing in with an email and password. This authentication and order information is then stored on Firebase. each user can also view previously placed orders, which will fetch any previous orders from the server.
Page refreshes have been handled by keeping access tokens in local storage and automatically reusing valid tokens immediately upon page refresh. Unit tests for several components and redux reducers are written using Jest and Enzyme.



Implementation details - things learned by working on this project:

 - routing on a single page application (including Route, Redirect, Switch, NavLinks, etc)
 - handling POST / GET requests to server (firebase) via Axios
 - error handling - local and global
 - handling form validation and dynamic form set up via react
 - using interceptors for global error checking
 - using lifecyle hooks componentDidMount / componentWillMound / componentDidUpdate
 - very granular structure for reusability
 - redux for state management
 - handling asynchronous http calls through redux-thunk and action creators
 - using action creators
 - refactored reducers - outsourced utility function and other local functions to make the reducers as readable as possible
 - email and password authentication - sign up and sign in functionality
 - handling protected resources on the server depending on if a user is signed in or not
 - handling persistent authentication state with local storage to avoid the issue of being kicked out on page refresh
 - storing and retrieving previous orders for specific users
 - authentication / validation / auto sign in through local storage on page refresh
 - managing tokens and authentication on single page app
 - page guarding
 - unit testing with Jest and Enzyme (function and class based components)
 - responsive design + sidebar navigation for mobile devices
