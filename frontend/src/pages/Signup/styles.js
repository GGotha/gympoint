import styled from "styled-components";

export const Global = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
`;

export const Image = styled.img`
  margin-bottom: 2%;
`;

export const Formulario = styled.form`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputLogin = styled.input`
  width: 15%;
  height: 48px;
  margin: 0.3% auto;
  padding: 18px 15px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
`;

export const Entrarbtn = styled.button`
  width: 15.1%;
  height: 50px;
  background-color: #f94d6a;
  outline: 0;
  border: none;
  color: white;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  margin-top: 10px;
  text-weight: normal;
`;

export const Create = styled.a`
  text-decoration: none;
  color: white;
  margin-top: 1.5%;
  font-size: 16px;
  opacity: 0.5;
`;
