import React, { useState, useEffect } from "react";
import Header from "~/components/Header";
import { Link } from "react-router-dom";
import api from "~/services/api";

import { Content, BotaoCadastrar } from "./styles";
import GerenciandoAlunos from "~/components/GerenciandoAlunos";
import { FaPlus } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { Creators } from "~/store/modules/ducks/reducers";

function Alunos(props) {
  const [results, setResults] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    async function searchStudents() {
      dispatch(Creators.listStudentsRequest());
    }

    searchStudents();
  }, []);

  const handleInputChange = event => {
    const { students } = props;

    setResults(
      students.filter(data => {
        return data.name.toLowerCase().search(event.target.value) != -1;
      })
    );
  };

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
            <input
              type="text"
              placeholder="Buscar aluno"
              onChange={event => handleInputChange(event)}
            />
          </aside>
        </div>

        <GerenciandoAlunos results={results} />
      </Content>
    </div>
  );
}

export default connect(state => ({
  students: state.Reducers.students
}))(Alunos);
