import React, { useState, useEffect } from "react";

import { Container, Editar, Apagar } from "./styles";

import api from "~/services/api";

export default function GerenciandoAlunos() {
  const [dataPlanos, setDataPlanos] = useState([]);

  useEffect(() => {
    async function getPlanos() {
      const response = await api.get("/planos");

      const dataFormatted = response.data.map(data => ({
        ...data,
        price:
          "R$" +
          parseFloat(data.price)
            .toFixed(2)
            .replace(".", ","),
        duration:
          data.duration > 1 ? data.duration + " meses" : data.duration + " mês"
      }));

      console.log(dataFormatted);

      setDataPlanos(dataFormatted);
    }

    getPlanos();
  }, []);

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
          {dataPlanos.map((planos, index) => (
            <tr key={planos.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{planos.title}</td>
              <td style={{ textAlign: "center" }}>{planos.duration}</td>
              <td style={{ textAlign: "center" }}>{planos.price}</td>
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
