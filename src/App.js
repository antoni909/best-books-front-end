import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login.js';
import Logout from './Logout.js';
import Profile from './Profile.js';
import MyFavoriteBooks from './MyFavoriteBooks.js';

class App extends React.Component {

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    // console.log(user);
    return (
      <Router>
        <IsLoadingAndError>
          <Header>
            {isAuthenticated ?
            <Logout />
            :
            ''            
            }
          </Header>
          <Switch>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              {isAuthenticated ? 
                <MyFavoriteBooks />
              :
                <Login />
              }
            </Route>

            {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}


            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
        </IsLoadingAndError>
      </Router>
    );
  }
}

export default withAuth0(App);
