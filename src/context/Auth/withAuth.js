// Libraries
import React, { useContext } from "react";

// Context
import { AuthContext } from "./index";

/**
 * Injects all the auth context props in a component
 * @param {React.Component} WrappedComponent
 * @returns {React.Component}
 */
const withAuth = (WrappedComponent) => (props) => {
  const contextProps = useContext(AuthContext);
  return <WrappedComponent {...contextProps} {...props} />;
};

export default withAuth;