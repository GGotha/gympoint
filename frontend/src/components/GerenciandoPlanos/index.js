import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Editar, Apagar } from "./styles";
import { connect, useDispatch } from "react-redux";
import api from "~/services/api";
import history from "~/services/history";
import { toast } from "react-toastify";

function GerenciandoPlanos(props) {
  const dispatch = useDispatch();

  function handleEdit(planoId) {
    history.push(`/editar-plano/${planoId}`);
  }

  async function handleDelete(planoId) {
    try {
      const response = await api.delete(`planos/${planoId}`);

      if (response.data.status === "error") {
        return toast.error(
          "Ocorreu um erro no servidor, tente novamente mais tarde!"
        );
      }

      dispatch({ type: "plano/REMOVE", id: planoId });

      toast.success("Plano removido com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  const { planos } = props;

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th style={{ textAlign: "center" }}>Duração</th>
            <th style={{ textAlign: "center" }}>
              Valor <span>p/</span> mês
            </th>
          </tr>
        </thead>
        <tbody>
          {planos.map((planos, index) => (
            <tr key={planos.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{planos.title}</td>
              <td style={{ textAlign: "center" }}>{planos.duration}</td>
              <td style={{ textAlign: "center" }}>{planos.price}</td>
              <td width={10}>
                <Editar onClick={() => handleEdit(planos.id)}>editar</Editar>
              </td>
              <td width={10}>
                <Apagar onClick={() => handleDelete(planos.id)}>apagar</Apagar>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default withRouter(
  connect(state => ({
    planos: state.Reducers.planos
  }))(GerenciandoPlanos)
);
