import React, { Fragment, useState, useEffect } from "react";
import api from "~/services/api";
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";

function FormAwnserQuestionStudents({ helpOrderData }) {
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
        return toast.error(
          "Ocorreu um erro no servidor, tente novamente mais tarde!"
        );
      }

      dispatch({ type: "planosdeauxilio/REMOVE", id: helpOrderData.id });

      toast.success("Help order respondida com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro com o servidor, tente novamente mais tarde!"
      );
    }
  }
  return (
    <Fragment>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 className="text-center h3ParesNegociacoes">Pergunta do aluno</h3>
      </div>
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
