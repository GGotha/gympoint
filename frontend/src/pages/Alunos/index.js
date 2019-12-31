import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GerenciandoAlunos from "~/components/GerenciandoAlunos";
import Header from "~/components/Header";
import { Creators } from "~/store/modules/ducks/reducers";
import { BotaoCadastrar, Content } from "./styles";

function Alunos(props) {
  const [results, setResults] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    async function searchStudents() {
      dispatch(Creators.listStudentsRequest());
    }

    searchStudents();
  }, []);

  const handleInputChange = e => {
    const { students } = props;

    setResults(
      students.filter(data => {
        return data.name.toLowerCase().search(e.target.value) != -1;
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
              onChange={e => handleInputChange(e)}
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
