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
    var routeName = getUrlAndSplit[1];
    var routeDOMElement = document.getElementsByName(routeName)[0];
    routeDOMElement.style.color = "black";
  }, []);

  const profile = useSelector(state => state.Reducers.profile);

  function handleSignOut() {
    dispatch(AuthActions.signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/alunos">
            <img src={logo} alt="logo " />
          </Link>
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
              <Link name="matriculas" to="/matriculas">
                Matrículas
              </Link>
            </li>
            <li>
              <Link name="pedidos-de-auxilio" to="/pedidos-de-auxilio">
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
