import React, { Component } from "react";

import {
  Conteudo,
  File,
  InputText,
  Descricao,
  StyledBtn,
  Carregar
} from "./styles";

import Navbar from "../../components/Navbar";
import moment from "moment";
import ImageMeetup from "./ImageMeetup";

import axios from "axios";
import api from "../../services/api";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titulo: "",
      descricao: "",
      localizacao: "",
      file: "",
      date: ""
    };
  }

  handleInputChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateMeetup = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    // console.log(this.state.date);
    const dados = {
      titulo: this.state.titulo,
      descricao: this.state.descricao,
      localizacao: this.state.localizacao,
      date: this.state.date
    };

    const response = await api.post("/meetups", dados, config);

    if (response.data.status === "success") {
      alert(response.data.msg);
      this.props.history.push("/dashboard");
    } else {
      alert(response.data.msg);
    }
  };

  render() {
    return (
      <>
        <Navbar />
        <Conteudo>
          <div>
            <form
              id="formularioMeetups"
              action="POST"
              onSubmit={this.handleCreateMeetup}
            >
              <ImageMeetup name="banner_id" />
              <InputText
                type="text"
                name="titulo"
                minLength="6"
                required
                value={this.state.titulo}
                onChange={e => this.handleInputChange(e)}
                placeholder="Título do meetup"
              />
              <Descricao
                type="text"
                placeholder="Descrição completa"
                minLength="6"
                required
                name="descricao"
                value={this.state.descricao}
                onChange={e => this.handleInputChange(e)}
              />
              <InputText
                type="datetime-local"
                id="meeting-time"
                minLength="6"
                required
                placeholder="2001-09-02T12:03"
                name="date"
                // value="2001-09-02T12:03"
                onChange={e => this.handleInputChange(e)}
              />
              <InputText
                type="text"
                required
                placeholder="Localização"
                name="localizacao"
                value={this.state.localizacao}
                onChange={e => this.handleInputChange(e)}
              />
              <div>
                <StyledBtn type="submit">Salvar meetup</StyledBtn>
              </div>
            </form>
          </div>
        </Conteudo>
      </>
    );
  }
}
