import React, { useState } from "react";
import { FaAngleLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "~/components/Header";
import api from "~/services/api";
import {
  BotaoSalvar,
  BotaoVoltar,
  Content,
  FormularioCadastroAlunos,
  InputIdadePesoAltura,
  InputNomeEmail,
  QuadroDeCadastros
} from "./styles";

export default function CadastroAlunos() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  async function handleSubmit() {
    try {
      const formInformations = { nome, email, idade, peso, altura };

      const response = await api.post("/students", formInformations);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      toast.success("Aluno cadastrado com sucesso!");
    } catch (err) {
      return toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
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
              autoFocus
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
                <label htmlFor="idade">Idade</label>
                <InputIdadePesoAltura
                  type="text"
                  name="idade"
                  onChange={e => setIdade(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="peso">
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
                <label htmlFor="altura">Altura</label>
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
