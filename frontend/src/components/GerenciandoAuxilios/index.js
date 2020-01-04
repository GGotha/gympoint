import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import api from "~/services/api";
import FormAwnserQuestionStudents from "./FormAwnserQuestionStudents";
import { Container, Responder } from "./styles";
import { toast } from "react-toastify";
import "./styles.css";

function GerenciandoAuxilios(props) {
  const [helpOrderData, setHelpOrderData] = useState([]);

  async function openModal(helpOrderId) {
    const modalHelpOrders = document.getElementById("modalHelpOrders");
    modalHelpOrders.style.display = "block";

    const response = await api.get(`help-orders/${helpOrderId}`);

    setHelpOrderData(response.data);

    try {
      const response = await api.get(`help-orders/${helpOrderId}`);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      setHelpOrderData(response.data);
    } catch (err) {
      return toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  window.addEventListener("click", function(event) {
    const modalHelpOrders = document.getElementById("modalHelpOrders");

    if (event.target == modalHelpOrders) {
      modalHelpOrders.style.display = "none";
    }
  });

  const { planosDeAuxilio } = props;

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
            {planosDeAuxilio.map(auxilios => (
              <tr key={auxilios.id}>
                <td>{auxilios.Student.name}</td>
                <td width={10}>
                  <Responder onClick={() => openModal(auxilios.id)}>
                    responder
                  </Responder>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      <div id="modalHelpOrders" className="divModalFormularioHelpOrders">
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
