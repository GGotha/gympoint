import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Container } from './styles';

export default function PrivateRoute({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = useSelector(state => state.Reducers.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/alunos" />;
  }

  return <Route {...rest} component={Component} />;
}

PrivateRoute.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

PrivateRoute.defaultProps = {
  isPrivate: false
};
