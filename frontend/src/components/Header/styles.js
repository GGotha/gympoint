import styled from "styled-components";

export const Container = styled.div`
  height: 64px;
  background: #fff;
  width: 100%;
`;

export const Content = styled.div`
  height: 64px;
  padding: 0 30px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid #eee;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 75px;
    }

    span {
      margin-left: 20px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      color: #ee4d64;
      font-weight: bold;
      text-transform: uppercase;
      padding: 8px 30px 8px 0px;
    }

    ul {
      list-style: none;
      display: flex;
      align-items: center;

      li {
        margin: 0 15px;

        a {
          text-decoration: none;
          color: #999999;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 15px;
        }
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    span {
      display: block;
      color: #333;
    }

    a {
      text-decoration: none;
      color: #ee4d64;
      font-size: 15px;
    }
  }
`;
