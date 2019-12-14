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
  InputTitle,
  InputDuracaoPrecoMensalPrecoTotal
} from "./styles";

export default function CadastroPlanos() {
  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Cadastro de plano</h2>
          </div>
          <aside>
            <Link to="/planos">
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
            <label htmlFor="title">Título do plano</label>
            <InputTitle type="text" name="title" />
            <div>
              <div>
                <label htmlFor="duracao">
                  Duração <span>(em meses)</span>
                </label>
                <InputDuracaoPrecoMensalPrecoTotal type="text" name="duracao" />
              </div>
              <div>
                <label htmlFor="preco-mensal">Preço Mensal</label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="preco-mensal"
                />
              </div>

              <div>
                <label htmlFor="preco-total">Preço total</label>
                <InputDuracaoPrecoMensalPrecoTotal
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
