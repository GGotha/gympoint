import React from "react";
import Header from "~/components/Header";

import { Content, BotaoCadastrar } from "./styles";
import GerenciandoAlunos from "~/components/GerenciandoAlunos";
import { FaPlus } from "react-icons/fa";

export default function Alunos() {
  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Gerenciando alunos</h2>
          </div>
          <aside>
            <BotaoCadastrar>
              <FaPlus />
              Cadastrar
            </BotaoCadastrar>
            <input type="text" placeholder="Buscar aluno" />
          </aside>
        </div>

        <GerenciandoAlunos />
      </Content>
    </div>
  );
}
