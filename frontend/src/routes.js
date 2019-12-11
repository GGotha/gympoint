import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./components/PrivateRoute";

// import { Container } from './styles';
import Signin from "./pages/Signin";
import Alunos from "./pages/Alunos";
import Planos from "./pages/Planos";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/alunos" component={Alunos} isPrivate />
        <Route path="/planos" component={Planos} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
