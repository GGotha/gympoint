import React, { useEffect } from "react";

import { Content } from "./styles";
import Header from "~/components/Header";
import GerenciandoAuxilios from "~/components/GerenciandoAuxilios";
import { connect, useDispatch } from "react-redux";
import { Creators } from "~/store/modules/ducks/reducers";

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
