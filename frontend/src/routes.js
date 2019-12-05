import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Recsenha from "./pages/Recsenha";
import Detalhes from "./pages/Detalhes";
import Criarmeetup from "./pages/Criarmeetup";
import Page404 from "./components/Page404";
import { PrivateRoute } from "./components/PrivateRoute";
// import PrivateRoute from "react-private-route";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/criar-conta" component={CriarConta} />
      <Route exact path="/" component={Login} />
      <Route exact path="/recuperar-senha" component={Recsenha} />

      <PrivateRoute exact path="/detalhes/:id" component={Detalhes} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/criar-meetup" component={Criarmeetup} />
      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
