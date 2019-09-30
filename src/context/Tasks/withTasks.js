// Libraries
import React, { useContext } from "react";

// Context
import { TasksContext } from "./index";

/**
 * Injects all the auth context props in a component
 * @param {React.Component} WrappedComponent
 * @returns {React.Component}
 */
const withTasks = (WrappedComponent) => (props) => {
  const contextProps = useContext(TasksContext);
  return <WrappedComponent {...contextProps} {...props} />;
};

export default withTasks;