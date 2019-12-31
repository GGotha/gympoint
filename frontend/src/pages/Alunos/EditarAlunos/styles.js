import styled from "styled-components";
import { Form, Input } from "@rocketseat/unform";

export const Content = styled.div`
  width: 65%;
  margin: 30px auto;

  div {
    display: flex;
    justify-content: space-between;

    aside {
      display: flex;

      input {
        border: 0.5px solid #eee;
        padding-left: 15px;
        width: 100%;
      }
    }
  }

  table {
    width: 100%;
    margin-top: 30px;
    border-radius: 4px;
    background: white;
  }
`;

export const BotaoSalvar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #ee4d64;
  border: none;
  outline: 0;
  padding: 8px 25px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 4px;
  height: auto;

  svg {
    margin-right: 10px;
    font-size: 16px;
  }

  &:hover {
    opacity: 0.7;
    transition: all 0.3s ease-out;
  }
`;

export const BotaoVoltar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #000;
  opacity: 0.2;
  border: none;
  outline: 0;
  padding: 8px 25px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 30px;
  border-radius: 4px;

  svg {
    margin-right: 10px;
    font-size: 16px;
  }

  &:hover {
    opacity: 0.7;
    transition: all 0.3s ease-out;
  }
`;

export const QuadroDeCadastros = styled.div`
  padding: 30px 30px;
  width: 100%;
  background: #fff;
  margin-top: 30px;
`;

export const FormularioEditarAlunos = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  div {
    div {
      display: flex;
      flex-direction: column;
      width: 32%;
    }
  }
`;

export const InputNomeEmail = styled(Input)`
  padding: 10px 15px;
  font-size: 15px;
  border: 1px solid #dddddd;
  margin-bottom: 20px;
  width: 100%;
`;

export const InputIdadePesoAltura = styled(Input)`
  padding: 10px;
  font-size: 15px;
  border: 1px solid #dddddd;
  margin-bottom: 20px;
  width: 100%;
`;
