import styled from "styled-components";

import { Link } from "react-router-dom";

export const Global = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
  width: 100%;
  min-height: 100vh;
`;

export const StyledEdit = styled(Link)`
  background: #4dbaf9;
  outline: 0;
  border: 0;
  color: white;
  text-decoration: none;
  width: 116px;
  height: 42px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0% 0 0;
  border-radius: 4px;
`;

export const StyledCancel = styled(Link)`
  background: #d44059;
  outline: 0;
  border: 0;
  color: white;
  text-decoration: none;
  width: 116px;
  height: 42px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0% 0 5%;
  border-radius: 4px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3% 15%;

  h1 {
    color: white;
  }

  div {
    display: flex;
  }
`;

export const DivImage = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: 450px;
  }
`;

export const Conteudo = styled.div`
  margin: 3% 15%;

  p {
    color: white;
    font-size: 18px;
    margin-top: 2%;
    text-align: justify;
    line-height: 35px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  margin-top: 2%;

  span {
    margin: 0 2%;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
`;
