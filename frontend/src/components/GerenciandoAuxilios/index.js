import React, { Fragment, useState, useEffect } from "react";

import { Container, Responder } from "./styles";
import { connect, useDispatch } from "react-redux";

import api from "~/services/api";
import "./styles.scss";
import FormAwnserQuestionStudents from "./FormAwnserQuestionStudents";

function GerenciandoAuxilios(props) {
  const [dataAuxilios, setDataAuxilios] = useState([]);
  const [helpOrderData, setHelpOrderData] = useState([]);
  const [
    isModalParesDeNegociacaoOpen,
    setIsModalParesDeNegociacaoOpen
  ] = useState(false);

  useEffect(() => {
    async function getAuxilios() {
      const response = await api.get("help-orders");

      setDataAuxilios(response.data);
    }

    getAuxilios();
  }, []);

  async function changeBlock(helpOrderId) {
    setIsModalParesDeNegociacaoOpen(true);
    const modal = document.getElementById("modalParesNegociacoes");
    modal.style.display = "block";

    const response = await api.get(`help-orders/${helpOrderId}`);

    setHelpOrderData(response.data);
  }

  window.addEventListener("click", function(event) {
    setIsModalParesDeNegociacaoOpen(false);
    const modal = document.getElementById("modalParesNegociacoes");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  return (
    <Fragment>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
            </tr>
          </thead>
          <tbody>
            {props.planosDeAuxilio.map(auxilios => (
              <tr key={auxilios.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{auxilios.Student.name}</td>
                <td width={10}>
                  <Responder onClick={() => changeBlock(auxilios.id)}>
                    responder
                  </Responder>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      <div id="modalParesNegociacoes" className="divModalParesDeNegociacoes">
        <div className="modal-content">
          <FormAwnserQuestionStudents helpOrderData={helpOrderData} />
        </div>
      </div>
    </Fragment>
  );
}
export default connect(state => ({
  planosDeAuxilio: state.Reducers.planosDeAuxilio
}))(GerenciandoAuxilios);
