import styled from "styled-components";

export const Container = styled.div`
  label {
    width: 100%;
    cursor: pointer;
    height: 300px;
    background: rgba(0, 0, 0, 0.3);
    margin: 0% 0 2% 0;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: white;
      opacity: 0.3;
    }

    input {
      display: none;
    }
  }
`;
