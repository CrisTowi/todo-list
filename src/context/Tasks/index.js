// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// API helpers
import API from '../../api';

// Context creator
const TasksContext = React.createContext({});

class TasksProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      activeTask: null,
      showForm: false,
    };
  }

  /**
   * When the component is mounted then call a function to get all
   * the tasks for this user in the database
   *
   * @memberof TasksProvider
   */
  componentDidMount() {
    this.handleGetTasks();
  }

  /**
   * Functio that makes the API call to get all the tasks for this user
   * ans stores it in the context state
   *
   * @memberof TasksProvider
   */
  handleGetTasks = async () => {
    try {
      const response = await API.Tasks.getTasks();

      this.setState({
        tasks: response.data,
      });
    } catch (error) {
      this.setState({
        loggedIn: false,
      });
    }
  }

  /**
   * Function that takes title and description as arguments and 
   * cretes a new task on the database
   *
   * @memberof TasksProvider
   */
  handleCreateTask = async (title, description) => {
    try {
      await API.Tasks.createTask(title, description);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function that takes the id of a task and as argument and
   * makes the API call to delete it from the database
   *
   * @memberof TasksProvider
   */
  handleDeleteTask = async (id) => {
    try {
      await API.Tasks.deleteTask(id);
    } catch (error) {
      console.log(error);
    }
  }

  handleEditTask = async (id, data) => {
    try {
      await API.Tasks.editTask(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  handleShowForm = (showForm) => {
    this.setState({
      showForm,
    });
  }

  handleSelectActiveTask = (activeTask) => {
    this.setState({
      activeTask,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <TasksContext.Provider
        value={{
          handleShowForm: this.handleShowForm,
          handleSelectActiveTask: this.handleSelectActiveTask,
          handleCreateTask: this.handleCreateTask,
          handleGetTasks: this.handleGetTasks,
          handleDeleteTask: this.handleDeleteTask,
          handleEditTask: this.handleEditTask,
          ...this.state,
        }}
      >
        {children}
      </TasksContext.Provider>
    );
  }
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TasksProvider, TasksContext };
