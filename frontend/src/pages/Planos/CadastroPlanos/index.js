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
  FormularioCadastroPlanos,
  InputDuracaoPrecoMensalPrecoTotal,
  InputTitle,
  QuadroDeCadastros
} from "./styles";

export default function CadastroPlanos() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState("R$0,00");
  const [totalPrice, setTotalPrice] = useState(0);

  const dadosCadastro = {
    title,
    duration,
    price
  };

  async function handleSubmit() {
    const response = await api.post("/planos", dadosCadastro);

    if (response.data.status === "error") {
      toast.error(response.data.msg);
    }

    if (response.data.status === "success") {
      toast.success(response.data.msg);
    }
  }

  useEffect(() => {
    setTotalPrice(parseFloat(price.replace("R$", "")) * duration);
  }, [duration, price]);

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
            <BotaoSalvar type="submit" form="formularioCadastroPlanos">
              <FaCheck />
              Salvar
            </BotaoSalvar>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioCadastroPlanos
            id="formularioCadastroPlanos"
            onSubmit={() => handleSubmit()}
          >
            <label htmlFor="title">Título do plano</label>
            <InputTitle
              type="text"
              name="title"
              onChange={e => setTitle(e.target.value)}
            />
            <div>
              <div>
                <label htmlFor="duration">
                  Duração <span>(em meses)</span>
                </label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="duration"
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">Preço Mensal</label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="price"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="totalPrice">Preço total</label>
                <InputDuracaoPrecoMensalPrecoTotal
                  type="text"
                  name="totalPrice"
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
          </FormularioCadastroPlanos>
        </QuadroDeCadastros>
      </Content>
    </div>
  );
}
