import React, { Component } from "react";

import { Formulario, InputLogin, Entrarbtn, Image, Create } from "./styles";

import M from "../../assets/M.png";
import api from "../../services/api";

import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
      nome: "",
      email: "",
      password: ""
    };
  }

  handleInputChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateUser = async e => {
    e.preventDefault();

    axios
      .post(`http://localhost:4444/users`, {
        name: this.state.nome,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.status === "success") {
          alert(res.data.msg);
          this.props.history.push("/");
        } else {
          alert(res.data.msg);
        }
      });
  };

  render() {
    return (
      <>
        <Formulario autoComplete="on" onSubmit={this.handleCreateUser}>
          <Image src={M} alt="" />
          <InputLogin
            type="text"
            minLength="6"
            name="nome"
            placeholder="Nome Completo"
            onChange={e => this.handleInputChange(e)}
            value={this.state.nome}
          />
          <InputLogin
            type="email"
            minLength="6"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={e => this.handleInputChange(e)}
            value={this.state.email}
          />
          <InputLogin
            type="password"
            name="password"
            placeholder="Sua senha secreta"
            name="password"
            minLength="6"
            onChange={e => this.handleInputChange(e)}
            value={this.state.password}
          />
          <Entrarbtn type="submit">Criar Conta</Entrarbtn>
          <Create href="/">Já tenho login</Create>
        </Formulario>
      </>
    );
  }
}
