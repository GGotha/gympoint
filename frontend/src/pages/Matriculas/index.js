import React from "react";

import { Content, BotaoCadastrar } from "./styles";
import Header from "../../components/Header";
import GerenciandoMatriculas from "../../components/GerenciandoMatriculas";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            <Link to="/cadastro-de-matriculas">
              <BotaoCadastrar>
                <FaPlus />
                Cadastrar
              </BotaoCadastrar>
            </Link>
          </aside>
        </div>

        <GerenciandoMatriculas />
      </Content>
    </div>
  );
}
