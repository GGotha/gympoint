import React, { Component } from "react";

import { Formulario, InfLogin } from "./styles";

import Navbar from "../../components/Navbar";

import axios from "axios";

export default class Recsenha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: undefined,
      email: undefined
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
        this.setState({ email: res.data.getInfoUser.email });
      });
  }
  render() {
    return (
      <>
        <Navbar />
        <div>
          <Formulario action="">
            <InfLogin>
              <input
                type="text"
                value={
                  this.state.nome === undefined
                    ? "Carregando..."
                    : this.state.nome
                }
                placeholder="Seu nome"
              />
              <input
                type="text"
                value={
                  this.state.email === undefined
                    ? "Carregando..."
                    : this.state.email
                }
                placeholder="Seu email"
              />
              <span />
              <input type="password" placeholder="Senha atual" required />
              <input type="password" placeholder="Nova senha" required />
              <input type="password" placeholder="Confirmação Senha" required />
              <div>
                <button type="submit">Salvar Perfil</button>
              </div>
            </InfLogin>
          </Formulario>
        </div>
      </>
    );
  }
}
