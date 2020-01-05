import React from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from "~/services/history";
import { Apagar, Container, Editar } from "./styles";
import "./styles.css";

function GerenciandoAlunos(props) {
  const dispatch = useDispatch();

  function handleEdit(student) {
    history.push(`/editar-aluno/${student.id}`);
  }

  async function handleDelete(student) {
    if (
      window.confirm(
        `Você tem certeza que deseja deletar o aluno ${student.name}?`
      )
    ) {
      try {
        const response = await api.delete(`students/${student.id}`);

        if (response.data.status === "error") {
          return toast.error(response.data.msg);
        }

        dispatch({ type: "student/REMOVE", id: student.id });

        toast.success("Aluno removido com sucesso!");
      } catch (err) {
        return toast.error(
          "Ocorreu um erro com o servidor, tente novamente mais tarde!"
        );
      }
    }
  }

  const { results, students } = props;

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th className="text-center">Idade</th>
          </tr>
        </thead>
        {students.length === 0 ? (
          <h4>Sem alunos cadastrados</h4>
        ) : (
          <tbody>
            {results === undefined
              ? students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td width={350}>{student.email}</td>
                    <td className="text-center">{student.age}</td>
                    <td width={10}>
                      <Editar onClick={() => handleEdit(student)}>
                        editar
                      </Editar>
                    </td>
                    <td width={10}>
                      <Apagar onClick={() => handleDelete(student)}>
                        apagar
                      </Apagar>
                    </td>
                  </tr>
                ))
              : results.map(result => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td width={350}>{result.email}</td>
                    <td className="text-center">{result.age}</td>
                    <td width={10}>
                      <Editar onClick={() => handleEdit(result)}>editar</Editar>
                    </td>
                    <td width={10}>
                      <Apagar onClick={() => handleDelete(result)}>
                        apagar
                      </Apagar>
                    </td>
                  </tr>
                ))}
          </tbody>
        )}
      </table>
    </Container>
  );
}
export default withRouter(
  connect(state => ({
    students: state.Reducers.students
  }))(GerenciandoAlunos)
);
