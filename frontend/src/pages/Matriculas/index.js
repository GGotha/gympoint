import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Creators } from "~/store/modules/ducks/reducers";
import GerenciandoMatriculas from "../../components/GerenciandoMatriculas";
import Header from "../../components/Header";
import { BotaoCadastrar, Content } from "./styles";

function Matriculas() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function searchMatriculas() {
      dispatch(Creators.listMatriculasRequest());
    }

    searchMatriculas();
  }, []);

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

export default connect()(Matriculas);
