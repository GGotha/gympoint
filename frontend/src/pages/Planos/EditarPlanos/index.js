import React, { useState, useEffect } from "react";
import Header from "~/components/Header";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaCheck } from "react-icons/fa";
import api from "~/services/api";

import {
  Content,
  BotaoSalvar,
  BotaoVoltar,
  QuadroDeCadastros,
  FormularioCadastroAlunos,
  InputTitle,
  InputDuracaoPrecoMensalPrecoTotal
} from "./styles";

export default function EditarPlanos() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    async function getPlanos() {
      const response = await api.get(`/planos/${id}`);

      console.log(response);

      const planos = response.data;

      setTitle(planos.title);
      setDuration(planos.duration);
      setPrice(parseFloat(planos.price).toFixed(2));
    }

    setTotalPrice(parseFloat(price * duration).toFixed(2));

    getPlanos();
  }, [duration]);

  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Edição de plano</h2>
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
            <InputTitle
              type="text"
              name="title"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <div>
              <div>
                <label htmlFor="duracao">
                  Duração <span>(em meses)</span>
                </label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="duracao"
                  onChange={e => setDuration(e.target.value)}
                  value={duration}
                  // defaultValue={duration}
                />
              </div>
              <div>
                <label htmlFor="preco-mensal">Preço Mensal</label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="preco-mensal"
                  onChange={e => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div>
                <label htmlFor="preco-total">Preço total</label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="preco-total"
                  disabled
                  value={totalPrice}
                />
              </div>
            </div>
          </FormularioCadastroAlunos>
        </QuadroDeCadastros>
      </Content>
    </div>
  );
}
