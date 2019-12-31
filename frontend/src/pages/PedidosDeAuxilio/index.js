import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import GerenciandoAuxilios from "~/components/GerenciandoAuxilios";
import Header from "~/components/Header";
import { Creators } from "~/store/modules/ducks/reducers";
import { Content } from "./styles";

function PedidosDeAuxilio() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function searchHelpOrders() {
      dispatch(Creators.listPlanosDeAuxilioRequest());
    }

    searchHelpOrders();
  }, []);

  return (
    <div>
      <Header />
      <Content>
        <div>
          <h2>Pedidos de auxílio</h2>
          <GerenciandoAuxilios />
        </div>
      </Content>
    </div>
  );
}

export default connect(state => ({
  planosDeAuxilio: state.Reducers.planosDeAuxilio
}))(PedidosDeAuxilio);
