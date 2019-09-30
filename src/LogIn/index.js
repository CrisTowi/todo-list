// Libraries
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Context
import withAuth from "../context/Auth/withAuth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  /**
   * Function triggered when user updates any field of the form
   * and take the field name and the new value to update it in the
   * state
   *
   * @memberof SignUp
   */
  handleFieldChange = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  /**
   * Function triggered when user submit form by clickin on the button
   *
   * @memberof SignUp
   */
  handleSubmit = () => {
    const { logIn } = this.props;
    const { username, password } = this.state;

    logIn(username, password);
  }

  render() {
    const { username, password } = this.state;

    return (
      <Form>
        <Form.Group controlId="formLogin">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => this.handleFieldChange("username", e.target.value)}
            placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => this.handleFieldChange("password", e.target.value)}
            type="password"
            placeholder="Password" />
        </Form.Group>
        <Button
          disabled={!username || !password}
          variant="success"
          type="button"
          onClick={this.handleSubmit}>
          Log In
        </Button>
        <div style={{ marginTop: "10px" }}>
          <Link to={"/signup"} >Not a member yet? Register here!</Link>
        </div>
      </Form>
    )
  }
}

export default withAuth(Login);
