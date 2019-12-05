import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// import { Container } from './styles';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathName: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
