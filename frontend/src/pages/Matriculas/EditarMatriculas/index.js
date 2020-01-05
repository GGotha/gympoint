import { addMonths, format, parseISO } from "date-fns";
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
  InputDtInicio,
  InputDtTermino,
  InputPlano,
  InputValorFinal,
  QuadroDeCadastros
} from "./styles";

export default function EditarMatriculas() {
  const [matriculas, setMatriculas] = useState({
    plano: "",
    start_date: new Date()
  });
  const [planos, setPlanos] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentIdMatricula, setStudentIdMatricula] = useState([]);
  const [planoIdMatricula, setPlanoIdMatricula] = useState([]);
  const [startDateMatricula, setStartDateMatricula] = useState(0);
  const [endDateMatricula, setEndDateMatricula] = useState(0);
  const [priceMatricula, setPriceMatricula] = useState(0);

  var getUrlAndSplit = window.location.pathname.split("/");
  var id = getUrlAndSplit[2];

  async function getMatriculas() {
    const response = await api.get(`matriculas/${id}`);

    setStudentIdMatricula(response.data.student_id);
    setPlanoIdMatricula(response.data.plan_id);
    setStartDateMatricula(
      format(parseISO(response.data.start_date), "yyyy'-'MM'-'dd")
    );
    setEndDateMatricula(
      format(parseISO(response.data.end_date), "yyyy'-'MM'-'dd")
    );
    setPriceMatricula(response.data.Plano.duration * response.data.Plano.price);
    setMatriculas(response.data);
  }

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

  useEffect(() => {
    getMatriculas();
    getStudents();
    getPlanos();
  }, []);

  useEffect(() => {
    if (planoIdMatricula && startDateMatricula) {
      setEndDateMatricula(
        format(
          addMonths(
            parseISO(matriculas.start_date),
            matriculas.duration || matriculas.Plano.duration
          ),
          "yyyy'-'MM'-'dd"
        )
      );

      if (matriculas.duration !== undefined) {
        setPriceMatricula(matriculas.duration * matriculas.price);
      }
    }
  }, [planoIdMatricula, matriculas.start_date]);

  function handleStudentChange(e) {
    setStudentIdMatricula(e.target.value);

    setMatriculas({
      ...matriculas,
      student_id: Number(e.target.value)
    });
  }

  function handleDateChange(e) {
    setStartDateMatricula(e.target.value);

    setMatriculas({
      ...matriculas,
      start_date: e.target.value
    });
  }

  function handlePlanChange(e) {
    const idPlano = Number(e.target.value);
    const planoSelecionado = planos.find(x => x.id === idPlano);

    setPlanoIdMatricula(planoSelecionado.id);
    setMatriculas({
      ...matriculas,
      plan_id: planoSelecionado.id,
      price: planoSelecionado.price,
      duration: planoSelecionado.duration
    });
  }

  async function handleSubmit() {
    const dados = {
      student_id: matriculas.student_id,
      plan_id: matriculas.plan_id,
      start_date: parseISO(matriculas.start_date)
    };

    try {
      const response = await api.put(`matriculas/${id}`, dados);

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      toast.success("Matrícula alterada com sucesso!");
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
            <h2>Edição de matrícula</h2>
          </div>
          <aside>
            <Link to="/matriculas">
              <BotaoVoltar>
                <FaAngleLeft />
                Voltar
              </BotaoVoltar>
            </Link>
            <BotaoSalvar type="submit" form="formularioEdicaoMatriculas">
              <FaCheck />
              Salvar
            </BotaoSalvar>
          </aside>
        </div>
        <QuadroDeCadastros>
          <FormularioCadastroAlunos
            id="formularioEdicaoMatriculas"
            onSubmit={() => handleSubmit()}
          >
            <label htmlFor="title">Aluno</label>
            <InputAluno
              name="student"
              options={students}
              value={studentIdMatricula}
              onChange={handleStudentChange}
            />
            <div>
              <div>
                <label htmlFor="duracao">Plano</label>
                <InputPlano
                  name="plano"
                  placeholder="Selecione o plano"
                  options={planos}
                  value={planoIdMatricula}
                  onChange={handlePlanChange}
                />
              </div>
              <div>
                <label htmlFor="preco-mensal">Data de ínicio</label>
                <InputDtInicio
                  name="preco-mensal"
                  type="date"
                  placeholder="Escolha a data"
                  value={startDateMatricula}
                  onChange={handleDateChange}
                />
              </div>

              <div>
                <label htmlFor="preco-total">Data de término</label>
                <InputDtTermino
                  type="date"
                  name="preco-total"
                  value={endDateMatricula}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="preco-total">Valor final</label>
                <InputValorFinal
                  type="text"
                  name="preco-total"
                  disabled
                  value={priceMatricula}
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
