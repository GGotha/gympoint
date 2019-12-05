import styled from "styled-components";

export const Global = styled.div`
  background-image: linear-gradient(to bottom, #22202c, #402845);
  width: 100%;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3% 15%;

  h1 {
    color: white;
  }

  a {
    background: #f94d6a;
    outline: 0;
    border: 0;
    color: white;
    text-decoration: none;
    width: 172px;
    height: 42px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 0.6;
    }
    span {
      margin: 0 5%;
    }
  }
`;

export const Listas = styled.div`
  display: flex;
  margin: 3% 15%;

  ul {
    width: 100%;
    list-style: none;
  }

  li {
    margin: 1% auto;
    color: white;
    background: rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
`;
