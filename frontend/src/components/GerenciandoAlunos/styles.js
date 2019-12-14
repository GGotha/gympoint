import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  table {
    padding: 30px 30px;
    border-collapse: collapse;
    width: 100%;

    thead {
      tr {
        th {
          text-align: left;
          padding: 15px;
          text-transform: uppercase;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 15px;
          color: #666666;
        }
      }
    }
  }
`;

export const Editar = styled.button`
  text-decoration: none;
  color: #4d85ee;
  background: none;
  outline: 0;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;
export const Apagar = styled.button`
  text-decoration: none;
  color: #de3b3b;
  background: none;
  outline: 0;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;
