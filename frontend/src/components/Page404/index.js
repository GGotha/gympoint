import React, { Component } from "react";

import { Formulario, Global, Texto } from "./styles";

import M from "../../assets/M.png";
import api from "../../services/api";

import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Global>
        <Formulario>
          <Texto>
            Página ou rota inexistente, por favor, tente novamente mais tarde
          </Texto>
        </Formulario>
      </Global>
    );
  }
}
