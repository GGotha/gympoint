import styled from "styled-components";

export const Container = styled.div`
  table {
    border-collapse: separate;
    width: 100%;
    padding: 20px 30px;
    border-radius: 4px;

    thead {
      tr {
        th {
          text-align: left;
          padding: 15px 15px 15px 0px;
          text-transform: uppercase;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 15px 15px 15px 0px;
          color: #666666;
          border-bottom: 1px solid #ddd;
        }

        &:last-child {
          td {
            border: none;
          }
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
