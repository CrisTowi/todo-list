// Libraries
import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";

// Context
import withTasks from "../../context/Tasks/withTasks";

class TaskForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: null,
      description: null,
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
      [field]: value,
    });
  }

  /**
   * Function called when there is no an active task to edit using
   * the same button as "Edit" to create a new Task
   *
   * @memberof TaskForm
   */
  handleCreateTask = async () => {
    const { title, description } = this.state;
    const { handleCreateTask, handleGetTasks } = this.props;

    await handleCreateTask(title, description);
    await handleGetTasks(false);

    this.handleModalClose();
  }

  /**
   * Function called when there is an active task to edit and using the
   * same button as "Create" to edit the active Task
   *
   * @memberof TaskForm
   */
  handleEditTask = async () => {
    const { title, description } = this.state;
    const { activeTask, handleEditTask, handleGetTasks, } = this.props;

    await handleEditTask(activeTask._id, {
      title: title || activeTask.title,
      description: description || activeTask.description,
    });
    await handleGetTasks(false);

    this.handleModalClose();
  }

  /**
   * Triggered when the user clicks on the button and depending of the
   * current context state calls the create/edit function
   *
   * @memberof TaskForm
   */
  handleSubmit = async () => {
    const { activeTask } = this.props;

    this.setState({ loading: true });

    if (!activeTask) {
      this.handleCreateTask();
    } else {
      this.handleEditTask();
    }
  }

  /**
   * Triggered when the modal is closed and restart the server settings
   *
   * @memberof TaskForm
   */
  handleModalClose = () => {
    const { handleShowForm, handleSelectActiveTask } = this.props;

    handleShowForm(false);
    handleSelectActiveTask(null);

    this.setState({
      title: null,
      description: null,
      loading: false,
    });
  }

  render() {
    const { title, description, loading } = this.state;
    const { showForm, activeTask } = this.props;

    return (
      <Modal show={showForm} onHide={this.handleModalClose}>
        <Modal.Header>
          {activeTask ? "Edit Task" : "Add a new Task"}
        </Modal.Header>
        <Form style={{ margin: "15px" }}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              defaultValue={activeTask ? activeTask.title : ""}
              onChange={(e) => this.handleFieldChange("title", e.target.value)}
              placeholder="Enter title" />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              defaultValue={activeTask ? activeTask.description : ""}
              onChange={(e) => this.handleFieldChange("description", e.target.value)}
              as="textarea"
              rows="3"
              placeholder="Enter description" />
          </Form.Group>
          <Button
            disabled={!activeTask && (!title || !description || loading)}
            variant="success"
            type="button"
            onClick={this.handleSubmit}>
            {loading ? "Loading..." : activeTask ? "Edit" : "Save"}
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default withTasks(TaskForm);
