import styled from "styled-components";

export const Content = styled.div`
  width: 75%;
  margin: 30px auto;

  div {
    display: flex;
    justify-content: space-between;
  }

  table {
    width: 100%;
    margin-top: 30px;
    border-radius: 4px;
    background: white;
  }
`;

export const BotaoCadastrar = styled.button`
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

  svg {
    margin-right: 10px;
  }

  &:hover {
    opacity: 0.7;
    transition: all 0.3s ease-out;
  }
`;
