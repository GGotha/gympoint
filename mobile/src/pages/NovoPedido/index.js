import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, InputPedirAjuda, Formulario } from './styles';
import Header from '~/components/Header';
import Button from '~/components/Button';
import api from '~/services/api';
import { useSelector } from 'react-redux';

export default function NovoPedido() {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.Reducers.profile.id);

  async function handleSubmit() {
    const formInformations = { question };
    try {
      const response = await api.post(
        `/students/${id}/help-orders`,
        formInformations,
      );

      if (response.data.status === 'error') {
        return Alert.alert(response.data.msg);
      }

      return Alert.alert(response.data.msg);
    } catch (err) {
      console.tron.log(err);
      return Alert.alert(
        'Ocorreu um erro com o servidor, tente novamente mais tarde!',
      );
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Formulario>
          <InputPedirAjuda
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Inclua seu pedido de auxílio"
            value={question}
            onChangeText={setQuestion}
          />
          <Button onPress={() => handleSubmit()}>Enviar pedido</Button>
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
