import React from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from "~/services/history";
import { Apagar, Container, Editar } from "./styles";

function GerenciandoPlanos(props) {
  const dispatch = useDispatch();

  function handleEdit(plano) {
    history.push(`/editar-plano/${plano.id}`);
  }

  async function handleDelete(plano) {
    if (
      window.confirm(
        `Você tem certeza que deseja deletar o plano ${plano.title}?`
      )
    ) {
      try {
        const response = await api.delete(`planos/${plano.id}`);

        if (response.data.status === "error") {
          return toast.error(response.data.msg);
        }

        dispatch({ type: "plano/REMOVE", id: plano.id });

        toast.success("Plano removido com sucesso!");
      } catch (err) {
        return toast.error(
          "Ocorreu um erro com o servidor, tente novamente mais tarde!"
        );
      }
    }
  }

  const { planos } = props;

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th className="text-center">Duração</th>
            <th className="text-center">
              Valor <span>p/</span> mês
            </th>
          </tr>
        </thead>
        <tbody>
          {planos.length !== 0 ? (
            planos.map(planos => (
              <tr key={planos.id} className="borderBottomGrey">
                <td>{planos.title}</td>
                <td className="text-center">{planos.duration}</td>
                <td className="text-center">{planos.price}</td>
                <td width={10}>
                  <Editar onClick={() => handleEdit(planos)}>editar</Editar>
                </td>
                <td width={10}>
                  <Apagar onClick={() => handleDelete(planos)}>apagar</Apagar>
                </td>
              </tr>
            ))
          ) : (
            <h5>Sem planos cadastrados</h5>
          )}
        </tbody>
      </table>
    </Container>
  );
}

export default withRouter(
  connect(state => ({
    planos: state.Reducers.planos
  }))(GerenciandoPlanos)
);
