import styled from "styled-components";

import { Link } from "react-router-dom";

export const Global = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
`;

export const Sairbtn = styled(Link)`
  width: 71px;
  height: 42px;
  margin: 0 0 0 35px;
  outline: 0;
  border: none;
  background-color: #d44059;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

export const Nav = styled.nav`
  padding: 25px 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 15%;
`;

export const Header = styled.header`
  background-color: rgba(0, 0, 0, 0.2);
`;

export const MeuPerfil = styled(Link)`
  color: white;
  font-size: 14px;
  opacity: 0.6;
  text-decoration: none;
  justify-content: right;
  text-align: right;
`;

export const RightHeader = styled.div`
  display: flex;

  h1 {
    color: white;
    font-size: 16px;
  }
`;

export const InformacoesRightHeader = styled.div`
  display: flex;
  flex-direction: column;
`;
