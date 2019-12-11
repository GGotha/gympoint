import React, { useState, useEffect } from "react";

import { Container, Editar, Apagar } from "./styles";
import { parseISO, isBefore, format } from "date-fns";
import { pt } from "date-fns/locale";
import { FaRegCheckCircle } from "react-icons/fa";

import api from "~/services/api";

export default function GerenciandoMatriculas() {
  const [dataMatriculas, setDataMatriculas] = useState([]);

  useEffect(() => {
    async function getMatriculas() {
      const response = await api.get("matriculas");

      const dataFormatted = response.data.map(data => ({
        ...data,
        fl_ativo: isBefore(parseISO(data.end_date), new Date()) ? (
          <FaRegCheckCircle style={{ color: "#DDDDDD" }} />
        ) : (
          <FaRegCheckCircle style={{ color: "#42CB59" }} />
        ),
        start_date: format(
          parseISO(data.start_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
        end_date: format(parseISO(data.end_date), "dd 'de' MMMM 'de' yyyy", {
          locale: pt
        })
      }));

      console.log(dataFormatted);

      setDataMatriculas(dataFormatted);
    }

    getMatriculas();
  }, []);

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
          {dataMatriculas.map((matriculas, index) => (
            <tr key={matriculas.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{matriculas.Student.name}</td>
              <td style={{ textAlign: "center" }}>{matriculas.Plano.title}</td>
              <td style={{ textAlign: "center" }}>{matriculas.start_date}</td>
              <td style={{ textAlign: "center" }}>{matriculas.end_date}</td>
              <td style={{ textAlign: "center" }}>{matriculas.fl_ativo}</td>
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
