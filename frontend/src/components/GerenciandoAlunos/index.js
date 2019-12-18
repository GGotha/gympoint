import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Editar, Apagar } from "./styles";
import { toast } from "react-toastify";

import { connect, useDispatch } from "react-redux";

import history from "~/services/history";
import api from "~/services/api";

function GerenciandoAlunos(props) {
  const dispatch = useDispatch();

  function handleEdit(studentId) {
    history.push(`/editar-aluno/${studentId}`);
  }

  async function handleDelete(studentId) {
    try {
      const response = await api.delete(`students/${studentId}`);

      if (response.data.status === "error") {
        return toast.error(
          "Ocorreu um erro no servidor, tente novamente mais tarde!"
        );
      }

      dispatch({ type: "student/REMOVE", id: studentId });

      toast.success("Aluno removido com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  // const { results, students } = props;
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
          </tr>
        </thead>
        <tbody>
          {props.results === 1
            ? props.students.map((student, index) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td width={10}>
                    <Editar onClick={() => handleEdit(student.id)}>
                      editar
                    </Editar>
                  </td>
                  <td width={10}>
                    <Apagar onClick={() => handleDelete(student.id)}>
                      apagar
                    </Apagar>
                  </td>
                </tr>
              ))
            : props.results.map((result, index) => (
                <tr key={result.id}>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.age}</td>
                  <td width={10}>
                    <Editar onClick={() => handleEdit(result.id)}>
                      editar
                    </Editar>
                  </td>
                  <td width={10}>
                    <Apagar onClick={() => handleDelete(result.id)}>
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
    students: state.Reducers.students
  }))(GerenciandoAlunos)
);
