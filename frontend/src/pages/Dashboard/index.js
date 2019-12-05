import React, { Component } from "react";

import { Container } from "./styles";

import { Link } from "react-router-dom";

import { FaPlusCircle } from "react-icons/fa";

import Navbar from "../../components/Navbar";

import axios from "axios";

import ListasDashboard from "../../components/ListasDashboard";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetups: [],
      link: ""
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4444/meetup`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.setState({ meetups: res.data.getMeetupsUser });
        this.setState({ link: `/detalhes/` + res.data.getMeetupsUser });
      });
  }

  render() {
    return (
      <>
        <Navbar />
        <Container>
          <h1>Meus meetups</h1>
          <Link to="/criar-meetup">
            <FaPlusCircle /> <span>Novo meetup</span>
          </Link>
        </Container>
        <ListasDashboard link={this.state.link} meetups={this.state.meetups} />
      </>
    );
  }
}
