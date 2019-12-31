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
  FormularioCadastroAlunos,
  InputDuracaoPrecoMensalPrecoTotal,
  InputTitle,
  QuadroDeCadastros
} from "./styles";

export default function EditarPlanos() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("R$0,00");
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    async function getPlanos() {
      const response = await api.get(`/planos/${id}`);

      const planos = response.data;

      setTitle(planos.title);
      setDuration(planos.duration);
      setPrice(planos.price);
      setTotalPrice(planos.price * planos.duration);
    }

    getPlanos();
  }, []);

  useEffect(() => {
    setTotalPrice(price * duration);
  }, [price, duration]);

  const dadosEdicao = {
    title,
    duration,
    price
  };

  async function handleSubmit() {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    try {
      const response = await api.put(`/planos/${id}`, dadosEdicao);

      if (response.data.status === "success") {
        toast.success(response.data.msg);
      }

      if (response.data.status === "error") {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(
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
            <h2>Edição de plano</h2>
          </div>
          <aside>
            <Link to="/planos">
              <BotaoVoltar>
                <FaAngleLeft />
                Voltar
              </BotaoVoltar>
            </Link>
            <BotaoSalvar type="submit" form="formularioEditarPlanos">
              <FaCheck />
              Salvar
            </BotaoSalvar>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioCadastroAlunos
            id="formularioEditarPlanos"
            onSubmit={() => handleSubmit()}
          >
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
                  prefix="R$"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
              </div>
            </div>
          </FormularioCadastroAlunos>
        </QuadroDeCadastros>
      </Content>
    </div>
  );
}
