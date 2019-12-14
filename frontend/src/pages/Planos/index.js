import React from "react";

import { Content, BotaoCadastrar } from "./styles";
import GerenciandoPlanos from "~/components/GerenciandoPlanos";
import Header from "~/components/Header";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            <Link to="/cadastro-de-planos">
              <BotaoCadastrar>
                <FaPlus />
                Cadastrar
              </BotaoCadastrar>
            </Link>
          </aside>
        </div>

        <GerenciandoPlanos />
      </Content>
    </div>
  );
}
