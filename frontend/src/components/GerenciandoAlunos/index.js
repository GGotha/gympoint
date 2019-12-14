import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Editar, Apagar } from "./styles";

import api from "~/services/api";
import history from "~/services/history";

function GerenciandoAlunos() {
  const [dataStudents, setDataStudents] = useState([]);
  const [index, setIndex] = useState(undefined);

  useEffect(() => {
    async function getStudents() {
      const response = await api.get("students");

      setDataStudents(response.data);
    }

    getStudents();
  }, []);

  function handleEdit(index) {
    const getId = index + 1;
    history.push(`/editar-aluno/${getId}`);
  }

  function handleDelete(index) {
    const getId = index + 1;
    history.push(`/editar-aluno/${getId}`);
  }

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
          {dataStudents.map((students, index) => (
            <tr key={students.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{students.name}</td>
              <td>{students.email}</td>
              <td>{students.age}</td>
              <td width={10}>
                <Editar onClick={() => handleEdit(index)}>editar</Editar>
              </td>
              <td width={10}>
                <Apagar onClick={() => handleDelete(index)}>apagar</Apagar>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
export default withRouter(GerenciandoAlunos);
