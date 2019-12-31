import React, { useState } from "react";
import Header from "~/components/Header";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaCheck } from "react-icons/fa";
import api from "~/services/api";
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import { Creators } from "~/store/modules/ducks/reducers";

import {
  Content,
  BotaoSalvar,
  BotaoVoltar,
  QuadroDeCadastros,
  FormularioCadastroAlunos,
  InputNomeEmail,
  InputIdadePesoAltura
} from "./styles";

export default function CadastroAlunos(props) {
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const dadosCadastro = {
    nome,
    email,
    idade,
    peso,
    altura
  };

  async function handleSubmit() {
    const response = await api.post("/students", dadosCadastro);

    if (response.data.status === "error") {
      toast.error(response.data.msg);
    }

    if (response.data.status === "success") {
      toast.success(response.data.msg);
    }
  }

  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Cadastro de aluno</h2>
          </div>
          <aside>
            <Link to="/alunos">
              <BotaoVoltar>
                <FaAngleLeft />
                Voltar
              </BotaoVoltar>
            </Link>
            <BotaoSalvar type="submit" form="formularioCadastroAlunos">
              <FaCheck />
              Salvar
            </BotaoSalvar>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioCadastroAlunos
            id="formularioCadastroAlunos"
            onSubmit={() => handleSubmit()}
          >
            <label htmlFor="name">Nome Completo</label>
            <InputNomeEmail
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={e => setNome(e.target.value)}
              required
            />
            <label htmlFor="email">Endereço de e-mail</label>
            <InputNomeEmail
              type="text"
              name="email"
              placeholder="exemplo@email.com"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div>
              <div>
                <label>Idade</label>
                <InputIdadePesoAltura
                  type="text"
                  name="idade"
                  onChange={e => setIdade(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>
                  Peso <span>(em kg)</span>
                </label>
                <InputIdadePesoAltura
                  type="text"
                  name="peso"
                  onChange={e => setPeso(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Altura</label>
                <InputIdadePesoAltura
                  type="text"
                  name="altura"
                  onChange={e => setAltura(e.target.value)}
                  required
                />
              </div>
            </div>
          </FormularioCadastroAlunos>
        </QuadroDeCadastros>
      </Content>
    </div>
  );
}
