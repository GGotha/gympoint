import styled from "styled-components";

export const Global = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
  width: 100%;
  min-height: 100vh;
`;

export const Formulario = styled.form`
  width: 100%;
`;

export const InfLogin = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 2% auto;

  input {
    width: 100%;
    margin: 0.5% auto;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    font-size: 18px;
  }

  span {
    margin: 0.5% auto;
    width: 100%;
    border: 1px solid grey;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;

    button {
      width: 162px;
      height: 42px;
      border: 1px solid;
      background: #f94d6a;
      border: none;
      outline: 0;
      color: white;
      font-size: 16px;
      border-radius: 4px;
      margin: 1% 0;
    }
  }
`;
