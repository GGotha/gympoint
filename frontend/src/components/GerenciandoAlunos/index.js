import React from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from "~/services/history";
import { Apagar, Container, Editar } from "./styles";

function GerenciandoAlunos(props) {
  const dispatch = useDispatch();

  function handleEdit(studentId) {
    history.push(`/editar-aluno/${studentId}`);
  }

  async function handleDelete(studentId) {
    try {
      const response = await api.delete(`students/${studentId}`);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      dispatch({ type: "student/REMOVE", id: studentId });

      toast.success("Aluno removido com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th style={{ textAlign: "center" }}>Idade</th>
          </tr>
        </thead>
        <tbody>
          {props.results === 1
            ? props.students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td width={350}>{student.email}</td>
                  <td style={{ textAlign: "center" }}>{student.age}</td>
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
                  <td width={350}>{result.email}</td>
                  <td style={{ textAlign: "center" }}>{result.age}</td>
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
