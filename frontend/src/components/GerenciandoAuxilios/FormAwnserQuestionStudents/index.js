import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "~/services/api";
import { Header } from "./styles";

function FormAwnserQuestionStudents(props) {
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setAnswer("");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        `help-orders/${helpOrderData.id}/answer`,
        { answer }
      );

      if (response.data.status === "error") {
        return toast.error(response.data.msg);
      }

      dispatch({ type: "planosdeauxilio/REMOVE", id: helpOrderData.id });

      toast.success("Help order respondida com sucesso!");
    } catch (err) {
      return toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }

  const { helpOrderData } = props;

  return (
    <Fragment>
      <Header>
        <h3>Pergunta do aluno</h3>
      </Header>
      <p>{helpOrderData.question}</p>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Sua resposta</label>
        <textarea
          onChange={e => setAnswer(e.target.value)}
          placeholder="exemplo@email.com"
        ></textarea>
        <button type="submit">Responder Aluno</button>
      </form>
    </Fragment>
  );
}

export default connect()(FormAwnserQuestionStudents);
