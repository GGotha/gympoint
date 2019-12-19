import React, { useState, useEffect } from "react";

import { Container, Editar, Apagar } from "./styles";
import { parseISO, isBefore, format } from "date-fns";
import { pt } from "date-fns/locale";
import { FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import api from "~/services/api";
import history from "~/services/history";
import { connect, useDispatch } from "react-redux";

function GerenciandoMatriculas(props) {
  const dispatch = useDispatch();

  function handleEdit(matriculaId) {
    history.push(`/editar-matricula/${matriculaId}`);
  }

  async function handleDelete(matriculaId) {
    try {
      const response = await api.delete(`matriculas/${matriculaId}`);

      if (response.data.status === "error") {
        return toast.error(
          "Ocorreu um erro no servidor, tente novamente mais tarde!"
        );
      }

      dispatch({ type: "matricula/REMOVE", id: matriculaId });

      toast.success("Matricula removida com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  const { matriculas } = props;

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th style={{ textAlign: "center" }}>Plano</th>
            <th style={{ textAlign: "center" }}>Início</th>
            <th style={{ textAlign: "center" }}>Término</th>
            <th style={{ textAlign: "center" }}>Ativa</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map((matriculas, index) => (
            <tr key={matriculas.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{matriculas.Student.name}</td>
              <td style={{ textAlign: "center" }}>{matriculas.Plano.title}</td>
              <td style={{ textAlign: "center" }}>{matriculas.start_date}</td>
              <td style={{ textAlign: "center" }}>{matriculas.end_date}</td>
              <td style={{ textAlign: "center" }}>
                {matriculas.fl_ativo === 0 ? (
                  <FaRegCheckCircle style={{ color: "#DDDDDD" }} />
                ) : (
                  <FaRegCheckCircle style={{ color: "#42CB59" }} />
                )}
              </td>
              <td width={10}>
                <Editar onClick={() => handleEdit(matriculas.id)}>
                  editar
                </Editar>
              </td>
              <td width={10}>
                <Apagar onClick={() => handleDelete(matriculas.id)}>
                  apagar
                </Apagar>
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
    matriculas: state.Reducers.matriculas
  }))(GerenciandoMatriculas)
);
