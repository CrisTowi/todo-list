// Libraries
import React, { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

// Context
import withTasks from "../../context/Tasks/withTasks";

class TaskList extends Component {

  /**
   * Handle delete task action triggered by the User clicking the
   * "Delete" button
   *
   * Delete the task and re-fetch the task list
   * @memberof TaskList
   */
  handleDeleteTask = async (e, id) => {
    e.preventDefault();
    const { handleDeleteTask, handleGetTasks } = this.props;
    
    await handleDeleteTask(id);
    await handleGetTasks();
  }

  /**
   * Handle edit tash to set the task as "Active" triggered by the User
   * clicking the "Edit" button
   *
   * @memberof TaskList
   */
  handleEditTask = async (e, task) => {
    e.preventDefault();
    const { handleShowForm, handleSelectActiveTask } = this.props;

    handleSelectActiveTask(task);
    handleShowForm(true);
  }

  render() {
    const { tasks } = this.props;

    return (
      <Container>
        <Row>
          {tasks.map((task) => (
            <Col xs={4} style={{ marginTop: "20px" }}>
              <Card key={task._id}>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>
                    {task.description}
                  </Card.Text>
                  <Card.Link onClick={(e) => this.handleDeleteTask(e, task._id)} href="#">Delete</Card.Link>
                  <Card.Link onClick={(e) => this.handleEditTask(e, task)} href="#">Edit</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}

export default withTasks(TaskList);