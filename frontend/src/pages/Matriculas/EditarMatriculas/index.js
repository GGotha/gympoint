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
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [planos, setPlanos] = useState([]);
  const [planoId, setPlanoId] = useState("");
  const [date, setDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [durationPro, setDurationPro] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [dataInicioNotFormatted, setDataInicioNotFormatted] = useState(
    new Date()
  );

  const dateFormatted = useMemo(
    () => format(currentDate, "dd/MM/yyyy", { locale: pt }),
    [currentDate]
  );

  useEffect(() => {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    async function getMatriculas() {
      const response = await api.get(`matriculas/${id}`);

      const dados = response.data;

      const formattedData = format(
        parseISO(response.data.start_date),
        "dd/MM/yyyy"
      );

      setPlanoId(dados.Plano.id);
      setStudentId(dados.Student.id);

      setEndDate(
        format(
          addMonths(parseISO(response.data.start_date), dados.Plano.duration),
          "dd/MM/yyyy"
        )
      );

      setFinalPrice(dados.Plano.price);

      setDataInicioNotFormatted(parseISO(response.data.start_date));
      setDataInicio(formattedData);
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

      const dataDuration = response.data.map(duration => ({
        id: duration.id,
        price: duration.price,
        duration: duration.duration
      }));

      setDuration(dataDuration);

      setPlanos(response.data);
    }

    async function getCurrentDate() {
      const dates = [{ id: 1, title: dateFormatted }];

      setDate(dates);
    }

    getMatriculas();
    getStudents();
    getPlanos();
    getCurrentDate();
  }, []);

  useEffect(() => {
    setEndDate(
      format(addMonths(dataInicioNotFormatted, durationPro), "dd/MM/yyyy")
    );
  }, [durationPro]);

  function teste(e) {
    let teste = duration.find(p => p.id == e.target.value);

    setPlanoId(teste.id);

    setDurationPro(teste.duration);
    setFinalPrice(teste.price);
  }

  async function handleSubmit() {
    var getUrlAndSplit = window.location.pathname.split("/");
    var id = getUrlAndSplit[2];

    const dados = {
      student_id: studentId,
      plan_id: planoId
    };

    try {
      const response = await api.put(`matriculas/${id}`, dados);

      if (response.data.status === "error") {
        return toast.error(
          "Ocorreu um erro no servidor, tente novamente mais tarde!"
        );
      }

      toast.success("Matrícula alterada com sucesso!");
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
              onChange={e => setStudentId(e.target.value)}
              id="teste"
              name="title"
              options={students}
              value={studentId}
            />
            <div>
              <div>
                <label htmlFor="duracao">Plano</label>
                <InputPlano
                  onChange={e => teste(e)}
                  name="plano"
                  placeholder="Selecione o plano"
                  options={planos}
                  value={planoId}
                />
              </div>
              <div>
                <label htmlFor="preco-mensal">Data de ínicio</label>
                <InputDtInicio
                  name="preco-mensal"
                  placeholder="Escolha a data"
                  value={dataInicio}
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
                  name="preco-total"
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
