import React from "react";

import { Content, BotaoCadastrar } from "./styles";
import GerenciandoPlanos from "~/components/GerenciandoPlanos";
import Header from "~/components/Header";
import { FaPlus } from "react-icons/fa";

export default function Planos() {
  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Gerenciando planos</h2>
          </div>
          <aside>
            <BotaoCadastrar>
              <FaPlus />
              Cadastrar
            </BotaoCadastrar>
          </aside>
        </div>

        <GerenciandoPlanos />
      </Content>
    </div>
  );
}
