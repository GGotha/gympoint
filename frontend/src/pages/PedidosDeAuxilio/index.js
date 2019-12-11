import React from "react";

import { Content } from "./styles";
import Header from "~/components/Header";
import GerenciandoAuxilios from "~/components/GerenciandoAuxilios";

export default function PedidosDeAuxilio() {
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
