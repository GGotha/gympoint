import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Header from '~/components/Header';
import { Container, Content, List } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GerenciamentoHelpOrders from '~/components/GerenciamentoHelpOrders';

export default function PedirAjuda(props) {
  const data = [1, 2];
  console.log('propzada', props);
  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={() => props.navigation.navigate('NovoPedido')}>
          Novo pedido de auxílio
        </Button>

        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Resposta')}>
              <GerenciamentoHelpOrders data={item} />
            </TouchableOpacity>
          )}
        />
      </Content>
    </Container>
  );
}

PedirAjuda.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
  headerTransparent: true,
  headerTintColor: '#FFF',
};
