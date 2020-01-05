import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Input from '~/components/Input';
import Background from '~/components/Background';
import Button from '~/components/Button';
import styles, { Container, Formulario } from './styles';
import api from '~/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '~/store/modules/ducks/reducers';

import logo from '~/assets/logo.png';

export default function Signin() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');

  const loading = useSelector(state => state.Reducers.loading);

  async function handleSubmit() {
    dispatch(Creators.signInRequest(id));
  }

  return (
    <Container>
      <View style={styles.viewImage}>
        <Image source={logo} alt="logo" style={styles.image} />
      </View>
      <Input
        style={{ marginTop: 30, marginBottom: 20, border: '1px solid' }}
        placeholder="Informe seu ID de cadastro"
        value={id}
        onChangeText={setId}
      />

      <Button onPress={() => handleSubmit()}>
        {loading ? 'Loading...' : 'Entrar no sistema'}
      </Button>
    </Container>
  );
}
