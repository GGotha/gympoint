import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Alert
} from "react-native";

// import AsyncStorage from "@react-native-community/async-storage";
import styles, { Container } from "./styles";
import api from "../../services/api";
import M from "../../assets/M.png";

import { signInRequest } from "../../store/modules/auth/actions";

import { colors, metrics } from "../../styles";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <View style={styles.form}>
        <View style={styles.divImagem}>
          <Image style={styles.imagem} source={M} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.light}
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          name="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="send"
          ref={passwordRef}
          placeholder="Sua senha secreta"
          placeholderTextColor={colors.light}
          underlineColorAndroid="transparent"
          secureTextEntry
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.footerText}>Criar Conta grátis</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

// export default Login;
