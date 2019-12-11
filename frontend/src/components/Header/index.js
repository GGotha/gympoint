import React, { useEffect } from "react";
import logo from "~/assets/peso.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Container, Content, Profile } from "./styles";

import { Creators as AuthActions } from "~/store/modules/ducks/reducers";

export default function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    var getUrlAndSplit = window.location.pathname.split("/");

    var getNameProperty = document.getElementsByName(getUrlAndSplit[1])[0].name;

    if (getUrlAndSplit[1] === getNameProperty) {
      document.getElementsByName(getUrlAndSplit[1])[0].style.color = "black";
    }
  }, []);

  const profile = useSelector(state => state.Reducers.profile);

  function handleSignOut() {
    dispatch(AuthActions.signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo " />
          <span>Gympoint</span>

          <ul>
            <li>
              <Link name="alunos" to="/alunos">
                Alunos
              </Link>
            </li>
            <li>
              <Link name="planos" to="/planos">
                Planos
              </Link>
            </li>
            <li>
              <Link name="matriculas" to="#">
                Matrículas
              </Link>
            </li>
            <li>
              <Link name="pedidos-de-auxilio" to="#">
                Pedidos de auxílio
              </Link>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <span>{profile.name}</span>
              <Link to="/" onClick={handleSignOut}>
                sair do sistema
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
