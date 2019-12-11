import React, { useState, useEffect } from "react";

import { Container, Responder } from "./styles";

import api from "~/services/api";

export default function GerenciandoAuxilios() {
  const [dataAuxilios, setDataAuxilios] = useState([]);

  useEffect(() => {
    async function getAuxilios() {
      const response = await api.get("help-orders");

      setDataAuxilios(response.data);
    }

    getAuxilios();
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
          </tr>
        </thead>
        <tbody>
          {dataAuxilios.map((auxilios, index) => (
            <tr key={auxilios.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{auxilios.Student.name}</td>
              <td width={10}>
                <Responder to="#">responder</Responder>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
