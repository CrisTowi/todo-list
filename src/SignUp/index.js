// Libraries
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

// Context
import withAuth from "../context/Auth/withAuth";

class SignUp extends Component {
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
    const { signUp } = this.props;
    const { username, password } = this.state;

    signUp(username, password);
  }

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
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
            Sign Up
          </Button>
        </Form>
      </div>
    )
  }
}

export default withAuth(SignUp);
