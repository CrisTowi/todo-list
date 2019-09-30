// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// API helpers
import API from '../../api';

// Context creator
const AuthContext = React.createContext({});

class AuthProvider extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      user: null,
    };
  }

  /**
   * When the component is mounted then call a function to check if
   * the user is logged in
   *
   * @memberof AuthProvider
   */
  async componentDidMount() {
    this.loggedIn();
  }

  /**
   * Logged in function makes the API request an stores the user result
   * in the context. If does not exists then set the flag as false.
   *
   * @memberof AuthProvider
   */
  loggedIn = async () => {
    try {
      const { data } = await API.Auth.loggedIn();
      this.setState({
        user: data,
      });
    } catch (error) {
      this.setState({
        loggedIn: false,
      });
    }
  }

  /**
   * Function that makes the API call to login and if the result is correct
   * sets the logged in status as true and the user data with the result object
   *
   * @memberof AuthProvider
   */
  logIn = async (username, password) => {
    try {
      const { data } = await API.Auth.logIn(username, password);
      if (data && data._id) {
        this.setState({
          loggedIn: true,
          user: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function that makes the API call to logout and if the result is correct
   * sets the logged in status as false and the user data with null
   *
   * @memberof AuthProvider
   */
  logOut = async (username, password) => {
    try {
      await API.Auth.logOut();
      this.setState({
        loggedIn: false,
        user: null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function that makes the API call to signup a new user and if the result
   * is correct calls the log in function
   *
   * @memberof AuthProvider
   */
  signUp = async (username, password) => {
    try {
      await API.Auth.signUp(username, password);
      this.logIn(username, password);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          logIn: this.logIn,
          signUp: this.signUp,
          logOut: this.logOut,
          ...this.state,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
