import React from "react";
import Header from "~/components/Header";
import { Link } from "react-router-dom";

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
            <Link to="/cadastro-de-alunos">
              <BotaoCadastrar>
                <FaPlus />
                Cadastrar
              </BotaoCadastrar>
            </Link>
            <input type="text" placeholder="Buscar aluno" />
          </aside>
        </div>

        <GerenciandoAlunos />
      </Content>
    </div>
  );
}
