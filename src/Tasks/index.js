// Libraries
import React, { Component } from "react";
import { Button } from "react-bootstrap";

// Context
import withTasks from "../context/Tasks/withTasks";

// Components
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

class Tasks extends Component {
  render() {
    const { handleShowForm } = this.props;

    return (
      <>
        <Button
          variant="success"
          type="button"
          onClick={() => handleShowForm(true)}>
          Add a new Task
        </Button>
        <TaskForm />
        <TaskList />
      </>
    )
  }
}

export default withTasks(Tasks);
