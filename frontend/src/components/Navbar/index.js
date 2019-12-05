import React, { Component } from "react";

import {
  Nav,
  Header,
  RightHeader,
  InformacoesRightHeader,
  MeuPerfil,
  Sairbtn
} from "./styles";

import M from "../../assets/M.png";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: undefined
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4444/find`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.setState({ nome: res.data.getInfoUser.name });
      });
  }

  removeToken() {
    localStorage.removeItem("token");
  }
  render() {
    return (
      <Header>
        <Nav>
          <Link to="/dashboard">
            <img src={M} alt="" />
          </Link>

          <RightHeader>
            <InformacoesRightHeader>
              <h1>
                {this.state.nome === undefined
                  ? "Carregando..."
                  : this.state.nome}
              </h1>
              <MeuPerfil to="/recuperar-senha">Meu perfil</MeuPerfil>
            </InformacoesRightHeader>
            <Sairbtn onClick={this.removeToken} to="/">
              Sair
            </Sairbtn>
          </RightHeader>
        </Nav>
      </Header>
    );
  }
}
