import React, { useState, useEffect } from "react";

import { Container, Editar, Apagar } from "./styles";

import api from "~/services/api";

export default function GerenciandoAlunos() {
  const [dataStudents, setDataStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const response = await api.get("students");

      setDataStudents(response.data);
    }

    getStudents();
  }, []);

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
                <Editar to="#">editar</Editar>
              </td>
              <td width={10}>
                <Apagar to="#">apagar</Apagar>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
