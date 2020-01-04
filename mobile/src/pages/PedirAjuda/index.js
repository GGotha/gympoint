import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Header from '~/components/Header';
import { Container, Content, List } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GerenciamentoHelpOrders from '~/components/GerenciamentoHelpOrders';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Creators } from '~/store/modules/ducks/reducers';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

function PedirAjuda(props) {
  const dispatch = useDispatch();

  const id = useSelector(state => state.Reducers.profile.id);

  useEffect(() => {
    async function searchHelpOrders() {
      dispatch(Creators.listHelpOrdersRequest(id));
    }

    searchHelpOrders();
  }, []);

  async function handleClick(helpOrderId) {
    props.navigation.navigate('Resposta');
    AsyncStorage.setItem('helpOrderId', JSON.stringify(helpOrderId));
  }

  const { helpOrders } = props;

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={() => props.navigation.navigate('NovoPedido')}>
          Novo pedido de auxílio
        </Button>

        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item.id)}>
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

export default connect(state => ({
  helpOrders: state.Reducers.helpOrders,
}))(PedirAjuda);
