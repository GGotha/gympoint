import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logo from "~/assets/logo.png";
import { Creators as AuthActions } from "~/store/modules/ducks/reducers";
import { Container, DivLogo, Formulario, InputUnform } from "./styles";

export default function Signin() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    try {
      dispatch(AuthActions.signInRequest(email, password));
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EE4D64" }}>
      <Container>
        <Formulario onSubmit={handleSubmit}>
          <DivLogo>
            <img src={logo} alt="logo" />
          </DivLogo>
          <label>Seu e-mail</label>
          <InputUnform
            type="email"
            name="email"
            placeholder="exemplo@email.com"
            autoFocus
          />
          <label>Sua senha</label>
          <InputUnform
            type="password"
            name="password"
            placeholder="Sua senha secreta"
          />
          <div>
            <button type="submit">Entrar no sistema</button>
          </div>
        </Formulario>
      </Container>
    </div>
  );
}
