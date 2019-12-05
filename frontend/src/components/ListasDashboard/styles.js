import styled from "styled-components";

import { Link } from "react-router-dom";

export const Listas = styled.div`
  display: flex;
  margin: 0.5% 15%;

  ul {
    width: 100%;
    list-style: none;
  }

  li {
    margin: 0% auto;
    color: white;
    height: 62px
    background: rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    span {
      font-size: 18px;
      font-family: Helvetica-bold, sans-serif
    }
    p {
      font-size: 16px;
      opacity: 0.6
      margin: 0 0%;
      width: 19%
      span {
        margin-left: 20%;
      }
    }
  }
`;

export const LinkMeetups = styled(Link)`
  text-decoration: none;
`;
