import styled from "styled-components";
import { Form, Input } from "@rocketseat/unform";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  background: #fff;
  border: none;
  border-radius: 4px;
`;

export const InputUnform = styled(Input)`
  border: 1px solid #dddddd;
  outline: 0;
  padding: 10px;
  margin-top: 5px;
  height: 45px;
  color: #000;
`;

export const Formulario = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 450px;
  padding: 20px 25px;

  label {
    text-align: left;
    margin-top: 20px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }

  button {
    margin-top: 15px;
    width: 100%;
    padding: 12px 5px;
    background: #ee4d64;
    border-radius: 4px;
    outline: 0;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
      transition: all 1s ease-out;
    }
  }
`;

export const DivLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 50%;
  }
`;

export const Background = styled.div`
  min-height: 100vh;
  background: #ee4d64;
`;
