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

  function handleEdit(matricula) {
    history.push(`/editar-matricula/${matricula.id}`);
  }

  async function handleDelete(matricula) {
    if (window.confirm(`Você tem certeza que deseja deletar esta matrícula?`)) {
      try {
        const response = await api.delete(`matriculas/${matricula.id}`);

        if (response.data.status === "error") {
          return toast.error(response.data.msg);
        }

        dispatch({ type: "matricula/REMOVE", id: matricula.id });

        toast.success("Matricula removida com sucesso!");
      } catch (err) {
        return toast.error(
          "Ocorreu um erro com o servidor, tente novamente mais tarde!"
        );
      }
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
          {matriculas.length !== 0 ? (
            matriculas.map(matriculas => (
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
                  <Editar onClick={() => handleEdit(matriculas)}>editar</Editar>
                </td>
                <td width={10}>
                  <Apagar onClick={() => handleDelete(matriculas)}>
                    apagar
                  </Apagar>
                </td>
              </tr>
            ))
          ) : (
            <h4>Sem matrículas cadastradas</h4>
          )}
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
