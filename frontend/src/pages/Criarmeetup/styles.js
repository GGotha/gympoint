import styled from "styled-components";

import { Link } from "react-router-dom";

export const Global = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
  width: 100%;
  min-height: 100vh;
`;

export const Conteudo = styled.div`
  margin: 3% 15%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      justify-content: right;
      width: 100%;
      margin-top: 1%;
    }
  }

  input {
    box-sizing: border-box;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
  }
`;

export const File = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(0, 0, 0, 0.3);
  margin: 0% 0 2% 0;

  h1 {
    color: white;
    position: absolute;
    font-size: 20px;
    top: 300px;
    right: 850px;
    opacity: 0.3;
  }
`;

export const Carregar = styled.input`
  width: 100%;
  opacity: 0;
`;

export const InputText = styled.input`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.3% auto;
  padding: 18px 15px;
`;

export const Descricao = styled.input`
  width: 100%;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 0px 0 100px 15px
  margin: 0.3% auto;
`;

export const StyledBtn = styled.button`
  background: #d44059;
  outline: 0;
  border: 0;
  color: white;
  text-decoration: none;
  width: 180px;
  height: 42px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0% 0 5%;
  border-radius: 4px;
`;
