import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GerenciandoPlanos from "~/components/GerenciandoPlanos";
import Header from "~/components/Header";
import { Creators } from "~/store/modules/ducks/reducers";
import { BotaoCadastrar, Content } from "./styles";

export default function Planos() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function searchPlanos() {
      dispatch(Creators.listPlanosRequest());
    }

    searchPlanos();
  }, []);

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
