import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, InputPedirAjuda, Formulario } from './styles';
import Header from '~/components/Header';
import Button from '~/components/Button';

export default function NovoPedido() {
  return (
    <Container>
      <Header />
      <Content>
        <Formulario>
          <InputPedirAjuda
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Inclua seu pedido de auxílio"
          />
          <Button>Enviar pedido</Button>
        </Formulario>
      </Content>
    </Container>
  );
}

NovoPedido.navigationOptions = ({ navigation }) => ({
  title: '',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PedirAjuda');
      }}>
      <Icon name="chevron-left" size={30} color="#000" />
    </TouchableOpacity>
  ),
});
