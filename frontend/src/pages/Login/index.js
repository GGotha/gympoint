import React, { Component } from "react";

import { Formulario, InputLogin, Entrarbtn, Image, Create } from "./styles";

import Navbar from "../../components/Navbar";

import M from "../../assets/M.png";
// import Api from "../../services/api";
import axios from "axios";

import api from "../../services/api";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
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
      .post(`http://localhost:4444/`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.status === "success") {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.props.history.push("/dashboard");
        } else {
          alert(res.data.msg);
        }
      });
  };

  render() {
    return (
      <>
        <Formulario autoComplete="false" onSubmit={this.handleCreateUser}>
          <Image src={M} alt="" />
          <InputLogin
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Digite seu e-mail"
            onChange={e => this.handleInputChange(e)}
          />
          <InputLogin
            type="password"
            name="password"
            value={this.state.password}
            minLength="6"
            placeholder="Sua senha secreta"
            onChange={e => this.handleInputChange(e)}
          />
          <Entrarbtn type="submit">Entrar</Entrarbtn>
          <Create href="/criar-conta">Criar conta grátis</Create>
        </Formulario>
      </>
    );
  }
}
