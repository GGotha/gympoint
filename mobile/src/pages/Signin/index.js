import React from 'react';
import {View, Text, Image} from 'react-native';

import Input from '~/components/Input';
import Background from '~/components/Background';
import Button from '~/components/Button';
import styles, {Container} from './styles';
3;
import logo from '~/assets/logo.png';

export default function Signin() {
  return (
    // <Background>
    <Container>
      <View style={styles.viewImage}>
        <Image source={logo} alt="logo" style={styles.image} />
      </View>
      <Input
        style={{marginTop: 30, marginBottom: 20, border: '1px solid'}}
        placeholder="Informe seu ID de cadastro"
      />

      <Button>Entrar no sistema</Button>
    </Container>
    // </Background>
  );
}
