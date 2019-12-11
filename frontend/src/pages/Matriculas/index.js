import React from "react";

import { Content, BotaoCadastrar } from "./styles";
import Header from "../../components/Header";
import GerenciandoMatriculas from "../../components/GerenciandoMatriculas";
import { FaPlus } from "react-icons/fa";

export default function Matriculas() {
  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Gerenciando Matrículas</h2>
          </div>
          <aside>
            <BotaoCadastrar>
              <FaPlus />
              Cadastrar
            </BotaoCadastrar>
          </aside>
        </div>

        <GerenciandoMatriculas />
      </Content>
    </div>
  );
}
