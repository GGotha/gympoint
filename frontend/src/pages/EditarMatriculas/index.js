import React, { useState } from "react";
import Header from "~/components/Header";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaCheck } from "react-icons/fa";
// import api from "~/services/api";

import {
  Content,
  BotaoSalvar,
  BotaoVoltar,
  QuadroDeCadastros,
  FormularioCadastroAlunos,
  InputAluno,
  InputDtTerminoValorFinal,
  InputPlanoDtInicio
} from "./styles";

export default function EditarMatriculas() {
  const options = [
    { id: "react", title: "ReactJS" },
    { id: "node", title: "NodeJS" },
    { id: "rn", title: "React Native" }
  ];

  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Edição de matrícula</h2>
          </div>
          <aside>
            <Link to="/matriculas">
              <BotaoVoltar>
                <FaAngleLeft />
                Voltar
              </BotaoVoltar>
            </Link>
            <Link to="#">
              <BotaoSalvar type="submit">
                <FaCheck />
                Salvar
              </BotaoSalvar>
            </Link>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioCadastroAlunos id="formulario">
            <label htmlFor="title">Aluno</label>
            <InputAluno
              id="teste"
              name="title"
              options={options}
              placeholder="Buscar aluno"
            />
            <div>
              <div>
                <label htmlFor="duracao">Plano</label>
                <InputPlanoDtInicio
                  name="plano"
                  placeholder="Selecione o plano"
                  options={options}
                />
              </div>
              <div>
                <label htmlFor="preco-mensal">Data de ínicio</label>
                <InputPlanoDtInicio
                  name="preco-mensal"
                  placeholder="Escolha a data"
                  options={options}
                />
              </div>

              <div>
                <label htmlFor="preco-total">Data de término</label>
                <InputDtTerminoValorFinal
                  type="text"
                  name="preco-total"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="preco-total">Valor final</label>
                <InputDtTerminoValorFinal
                  type="text"
                  name="preco-total"
                  disabled
                />
              </div>
            </div>
          </FormularioCadastroAlunos>
        </QuadroDeCadastros>
      </Content>
    </div>
  );
}
