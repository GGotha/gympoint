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
  InputDtInicio,
  InputPlanos,
  InputValorFinal,
  QuadroDeCadastros
} from "./styles";

export default function CadastroMatriculas() {
  const [students, setStudents] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [matricula, setMatricula] = useState({ plano: "", start_date: "" });
  const [total, setTotal] = useState(0);
  const [endDate, setEndDate] = useState(0);

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

      const dataPlanos = response.data;

      setPlanos(dataPlanos);
    }

    getStudents();
    getPlanos();
  }, []);

  async function handleSubmit(data) {
    const dados = {
      student_id: data.aluno,
      plan_id: data.plano,
      start_date: matricula.start_date
    };

    try {
      const response = await api.post("matriculas", dados);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      toast.success("Matrícula adicionada com sucesso!");
    } catch (err) {
      return toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  function handleDateChange(e) {
    setMatricula({
      ...matricula,
      start_date: new Date(e.target.value)
    });
  }

  function handlePlanChange(e) {
    const idPlano = Number(e.target.value);
    const planoSelecionado = planos.find(x => x.id === idPlano);
    setMatricula({ ...matricula, plano: planoSelecionado });
  }

  useEffect(() => {
    if (matricula.plano && matricula.start_date) {
      setEndDate(
        format(
          addMonths(matricula.start_date, matricula.plano.duration),
          "yyyy'-'MM'-'dd"
        )
      );

      setTotal(matricula.plano.duration * matricula.plano.price);
    }
  }, [matricula.plano, matricula.start_date]);

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
            initialData={matricula}
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
                <InputPlanos
                  onChange={handlePlanChange}
                  name="plano"
                  placeholder="Selecione o plano"
                  options={planos}
                />
              </div>
              <div>
                <label htmlFor="preco-mensal">Data de ínicio</label>
                <InputDtInicio
                  name="start_date"
                  type="date"
                  placeholder="Chose the date"
                  onChange={handleDateChange}
                />
              </div>

              <div>
                <label htmlFor="preco-total">Data de término</label>
                <InputDtTermino
                  type="date"
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
                  value={total}
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
