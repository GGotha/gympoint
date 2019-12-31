import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "~/components/Header";
import api from "~/services/api";
import {
  BotaoSalvar,
  BotaoVoltar,
  Content,
  FormularioEditarAlunos,
  InputIdadePesoAltura,
  InputNomeEmail,
  QuadroDeCadastros
} from "./styles";

export default function EditarAlunos() {
  const [nome, setNome] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [idade, setIdade] = useState(undefined);
  const [peso, setPeso] = useState(undefined);
  const [altura, setAltura] = useState(undefined);

  useEffect(() => {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    async function getStudent() {
      const response = await api.get(`/students/${id}`);

      const studentsData = response.data;

      setNome(studentsData.name);
      setEmail(studentsData.email);
      setIdade(studentsData.age);
      setPeso(parseFloat(studentsData.weight).toFixed(2));
      setAltura(parseFloat(studentsData.height).toFixed(2));
    }

    getStudent();
  }, []);

  async function handleSubmit() {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    try {
      const formInformations = { nome, email, idade, peso, altura };

      const response = await api.put(`/students/${id}`, formInformations);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      toast.success(response.data.msg);
    } catch (err) {
      return toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!  "
      );
    }
  }

  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Edição de aluno</h2>
          </div>
          <aside>
            <Link to="/alunos">
              <BotaoVoltar>
                <FaAngleLeft />
                Voltar
              </BotaoVoltar>
            </Link>
            <BotaoSalvar type="submit" form="formularioEditarAlunos">
              <FaCheck />
              Salvar
            </BotaoSalvar>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioEditarAlunos
            onSubmit={() => handleSubmit()}
            id="formularioEditarAlunos"
          >
            <label htmlFor="name">Nome Completo</label>
            <InputNomeEmail
              type="text"
              name="name"
              placeholder="John Doe"
              value={nome === undefined ? "Carregando..." : nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <label htmlFor="email">Endereço de e-mail</label>
            <InputNomeEmail
              type="text"
              name="email"
              placeholder="exemplo@email.com"
              value={email === undefined ? "Carregando..." : email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div>
              <div>
                <label>Idade</label>
                <InputIdadePesoAltura
                  type="text"
                  name="idade"
                  value={idade === undefined ? "Carregando..." : idade}
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
                  value={peso === undefined ? "Carregando..." : peso}
                  onChange={e => setPeso(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Altura</label>
                <InputIdadePesoAltura
                  type="text"
                  name="altura"
                  value={altura === undefined ? "Carregando..." : altura}
                  onChange={e => setAltura(e.target.value)}
                  required
                />
              </div>
            </div>
          </FormularioEditarAlunos>
        </QuadroDeCadastros>
      </Content>
    </div>
  );
}
