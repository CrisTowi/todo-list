// Axios config setup
import axiosConfig from './axios-config';

// Auth logic API calls definition
class Auth {
  static logIn(username, password) {
    return axiosConfig({
      method: "POST",
      url: "login",
      data: {
        username,
        password,
      }
    });
  }

  static logOut() {
    return axiosConfig({
      method: "POST",
      url: "logout",
    });
  }

  static signUp(username, password) {
    return axiosConfig({
      method: "POST",
      url: "signup",
      data: {
        username,
        password,
      }
    });
  }

  static loggedIn() {
    return axiosConfig({
      method: "GET",
      url: "loggedin",
    });
  }
}

// Tasks logic API calls definition
class Tasks {
  static getTasks() {
    return axiosConfig({
      method: "GET",
      url: "tasks",
    });
  }

  static createTask(title, description) {
    return axiosConfig({
      method: "POST",
      url: "tasks/create",
      data: {
        title,
        description
      }
    });
  }

  static editTask(id, data) {
    return axiosConfig({
      method: "POST",
      url: `tasks/edit/${id}`,
      data,
    });
  }

  static deleteTask(id) {
    return axiosConfig({
      method: "POST",
      url: `tasks/delete/${id}`,
    });
  }
}

export default {
  Auth,
  Tasks,
};
