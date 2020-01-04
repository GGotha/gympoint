import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from "~/services/history";
import { Apagar, Container, Editar } from "./styles";
import "./styles.css";

function GerenciandoMatriculas(props) {
  const dispatch = useDispatch();

  function handleEdit(matriculaId) {
    history.push(`/editar-matricula/${matriculaId}`);
  }

  async function handleDelete(matriculaId) {
    try {
      const response = await api.delete(`matriculas/${matriculaId}`);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      dispatch({ type: "matricula/REMOVE", id: matriculaId });

      toast.success("Matricula removida com sucesso!");
    } catch (err) {
      return toast.error(
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
            <th className="text-center">Plano</th>
            <th className="text-center">Início</th>
            <th className="text-center">Término</th>
            <th className="text-center">Ativa</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map(matriculas => (
            <tr key={matriculas.id} className="borderBottomGrey">
              <td>{matriculas.Student.name}</td>
              <td className="text-center">{matriculas.Plano.title}</td>
              <td className="text-center">{matriculas.start_date}</td>
              <td className="text-center">{matriculas.end_date}</td>
              <td className="text-center">
                {matriculas.fl_ativo === 0 ? (
                  <FaRegCheckCircle className="color-grey" />
                ) : (
                  <FaRegCheckCircle className="color-green" />
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
