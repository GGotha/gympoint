import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./components/PrivateRoute";

// import { Container } from './styles';
import Signin from "./pages/Signin";
import Alunos from "./pages/Alunos";
import Planos from "./pages/Planos";
import Matriculas from "./pages/Matriculas";
import PedidosDeAuxilio from "./pages/PedidosDeAuxilio";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/alunos" component={Alunos} isPrivate />
        <Route path="/planos" component={Planos} isPrivate />
        <Route path="/matriculas" component={Matriculas} isPrivate />
        <Route
          path="/pedidos-de-auxilio"
          component={PedidosDeAuxilio}
          isPrivate
        />
      </Switch>
    </BrowserRouter>
  );
}
