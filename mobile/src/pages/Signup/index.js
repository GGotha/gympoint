import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";

import styles, { Container } from "./styles";
import api from "../../services/api";

import M from "../../assets/M.png";

import { signUpRequest } from "../../store/modules/auth/actions";
import { colors, metrics } from "../../styles";

// import { Container } from './styles';

export default function Signup({ navigation }) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Container style={styles.backgroundTheme}>
      <View style={styles.form}>
        <View style={styles.divImagem}>
          <Image style={styles.imagem} source={M} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          placeholder="Nome Completo"
          placeholderTextColor={colors.light}
          underlineColorAndroid="transparent"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.light}
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Sua senha secreta"
          placeholderTextColor={colors.light}
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footerText}>Já tenho login</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
