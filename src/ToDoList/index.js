// Libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Row, Navbar } from "react-bootstrap";

// Context
import withAuth from "../context/Auth/withAuth";
import { TasksProvider } from "../context/Tasks";

// Components
import LogIn from "../LogIn";
import SignUp from "../SignUp";
import Tasks from "../Tasks";

class ToDoList extends Component {

  /**
   * Handle logout action when user clicks on the top
   * right "Log Out" button
   *
   * @memberof ToDoList
   */
  handleLogout = async () => {
    const { logOut } = this.props;

    await logOut();
  }

  render() {
    const { loggedIn, user } = this.props;

    return (
      <>
        <Navbar>
          <Navbar.Brand href="/">IronHack TO-DO list</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {loggedIn && (
              <>
                <Navbar.Text>
                  Welcome: {user ? user.username : null}
                </Navbar.Text>
                <Navbar.Text style={{ marginLeft: 10 }}>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={this.handleLogout}>
                    Log out
                  </Button>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Router>
          {loggedIn && (
            <TasksProvider>
              <h1>Welcome to the best TO-DO list of the world!</h1>
              <Route path="*" component={Tasks} /> 
            </TasksProvider>
          )}
          {!loggedIn && (
            <Row className="justify-content-md-center">
              <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="*" component={LogIn} />
              </Switch>
            </Row>
          )}
        </Router>
      </>
    )
  }
}

export default withAuth(ToDoList);
