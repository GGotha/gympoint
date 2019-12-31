import { addMinutes, addMonths, format } from "date-fns";
import pt from "date-fns/locale/pt";
import React, { useEffect, useMemo, useState } from "react";
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
  InputAluno,
  InputDtTermino,
  InputPlanoDtInicio,
  InputValorFinal,
  QuadroDeCadastros
} from "./styles";

export default function CadastroMatriculas() {
  const [students, setStudents] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [duration, setDuration] = useState([]);
  const [durationPro, setDurationPro] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const dateFormatted = useMemo(
    () => format(currentDate, "dd/MM/yyyy", { locale: pt }),
    [currentDate]
  );

  useEffect(() => {
    async function getStudents() {
      const response = await api.get("students");

      const data = response.data.map(students => ({
        ...students,
        title: students.name
      }));

      setStudents(data);
    }

    async function getPlanos() {
      const response = await api.get("planos");

      const dataDuration = response.data.map(duration => ({
        id: duration.id,
        price: duration.price,
        duration: duration.duration
      }));

      setDuration(dataDuration);

      setPlanos(response.data);
    }

    async function getCurrentDate() {
      const dates = [{ id: 1, title: dateFormatted, value: new Date() }];

      setDates(dates);
    }

    getStudents();
    getPlanos();
    getCurrentDate();
  }, []);

  useEffect(() => {
    setEndDate(format(addMonths(currentDate, durationPro), "dd/MM/yyyy"));
  }, [durationPro]);

  async function handleSubmit(data) {
    const dados = {
      student_id: data.aluno,
      plan_id: data.plano,
      start_date: addMinutes(currentDate, 1)
    };

    try {
      const response = await api.post("matriculas", dados);

      if (response.data.status === "error") {
        return toast.error(
          "Ocorreu um erro no servidor, tente novamente mais tarde!"
        );
      }

      toast.success("Matrícula adicionada com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  function teste(e) {
    let teste = duration.find(p => p.id == e.target.value);

    setDurationPro(teste.duration);
    setFinalPrice(teste.price);
  }

  return (
    <div>
      <Header />
      <Content>
        <div>
          <div>
            <h2>Cadastro de matrícula</h2>
          </div>
          <aside>
            <Link to="/matriculas">
              <BotaoVoltar>
                <FaAngleLeft />
                Voltar
              </BotaoVoltar>
            </Link>
            <BotaoSalvar type="submit" form="formularioCadastroMatriculas">
              <FaCheck />
              Salvar
            </BotaoSalvar>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioCadastroAlunos
            id="formularioCadastroMatriculas"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">Aluno</label>
            <InputAluno
              id="input-select"
              name="aluno"
              placeholder="Selecione o aluno"
              options={students}
            />
            <div>
              <div>
                <label htmlFor="duracao">Plano</label>
                <InputPlanoDtInicio
                  onChange={e => teste(e)}
                  name="plano"
                  placeholder="Selecione o plano"
                  // onChange={e => setPlanos(e.target.value)}
                  options={planos}
                />
              </div>
              <div>
                <label htmlFor="preco-mensal">Data de ínicio</label>
                <InputPlanoDtInicio
                  name="data-inicio"
                  placeholder="Escolha a data"
                  options={dates}
                />
              </div>

              <div>
                <label htmlFor="preco-total">Data de término</label>
                <InputDtTermino
                  type="text"
                  name="preco-total"
                  disabled
                  value={endDate}
                />
              </div>
              <div>
                <label htmlFor="preco-total">Valor final</label>
                <InputValorFinal
                  type="text"
                  name="totalPrice"
                  disabled
                  value={finalPrice}
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
