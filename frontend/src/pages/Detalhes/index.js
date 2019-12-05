import React, { Component } from "react";

import {
  Container,
  Conteudo,
  Footer,
  DivImage,
  StyledCancel,
  StyledEdit
} from "./styles";

import Navbar from "../../components/Navbar";

import imgDetalhes from "../../assets/Bitmap.png";

import axios from "axios";

import moment, { invalid } from "moment";

export default class Detalhes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titulo: undefined,
      descricao: undefined,
      localizacao: undefined,
      data: undefined,
      imagem: undefined
    };
  }

  async componentDidMount() {
    const id = await window.location.pathname.split("/");

    const idValido = id[2];

    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4444/meetup/${idValido}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.data.status === "success") {
          this.setState({ titulo: res.data.titulo });
          this.setState({ descricao: res.data.descricao });
          this.setState({ localizacao: res.data.localizacao });
          this.setState({ data: res.data.data });
          this.setState({ imagem: res.data.imagem });
        } else {
          this.props.history.push("/dashboard");
          alert("Artigo não encontrado");
        }
      });
  }
  render() {
    return (
      <>
        <Navbar />
        <Container>
          <h1>
            {this.state.titulo === undefined
              ? "Carregando..."
              : this.state.titulo}
          </h1>
          <div>
            <StyledEdit to="/login">Editar</StyledEdit>
            <StyledCancel to="/">Cancelar</StyledCancel>
          </div>
        </Container>
        <Conteudo>
          <DivImage>
            <img src={imgDetalhes} alt="" />
          </DivImage>

          <p>
            {this.state.descricao === undefined
              ? "Carregando..."
              : this.state.descricao}
          </p>
          <p>
            Caso queira participar como palestrante do meetup envie um e-mail
            para organizacao@meetuprn.com
          </p>
          <Footer>
            <span>
              {moment(this.state.data)
                .locale("pt-br")
                .format("DD MMMM, [às] HH:mm")}
            </span>
            <span>
              {this.state.localizacao === undefined
                ? "Carregando..."
                : this.state.localizacao}
            </span>
          </Footer>
        </Conteudo>
      </>
    );
  }
}
