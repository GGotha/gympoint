import React, { Fragment } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./components/PrivateRoute";

// import { Container } from './styles';
import Signin from "./pages/Signin";
import Alunos from "./pages/Alunos";
import Planos from "./pages/Planos";
import Matriculas from "./pages/Matriculas";
import PedidosDeAuxilio from "./pages/PedidosDeAuxilio";
import CadastroAlunos from "./pages/CadastroAlunos";
import CadastroPlanos from "./pages/CadastroPlanos";
import CadastroMatriculas from "./pages/CadastroMatriculas";
import EditarAlunos from "./pages/Alunos/EditarAlunos";
import EditarPlanos from "./pages/EditarPlanos";
import EditarMatriculas from "./pages/EditarMatriculas";

export default function Routes() {
  return (
    <Fragment>
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
        <Route
          path="/cadastro-de-alunos"
          component={CadastroAlunos}
          isPrivate
        />
        <Route
          path="/cadastro-de-planos"
          component={CadastroPlanos}
          isPrivate
        />
        <Route
          path="/cadastro-de-matriculas"
          component={CadastroMatriculas}
          isPrivate
        />
        <Route path="/editar-aluno/:id" component={EditarAlunos} isPrivate />
        <Route path="/editar-plano/:id" component={EditarPlanos} isPrivate />
        <Route
          path="/editar-matricula/:id"
          component={EditarMatriculas}
          isPrivate
        />
      </Switch>
    </Fragment>
  );
}
