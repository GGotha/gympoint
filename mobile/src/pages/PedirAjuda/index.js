import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { View, TouchableOpacity } from 'react-native';

import Header from '~/components/Header';
import { Container, Content, List, ViewList } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GerenciamentoHelpOrders from '~/components/GerenciamentoHelpOrders';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Creators } from '~/store/modules/ducks/reducers';
import AsyncStorage from '@react-native-community/async-storage';

function PedirAjuda({ navigation, isFocused, helpOrders }) {
  const dispatch = useDispatch();

  const id = useSelector(state => state.Reducers.profile.id);

  async function searchHelpOrders() {
    dispatch(Creators.listHelpOrdersRequest(id));
  }

  useEffect(() => {
    if (isFocused) {
      searchHelpOrders();
    }
  }, [isFocused]);

  async function handleClick(helpOrderId) {
    navigation.navigate('Resposta');
    AsyncStorage.setItem('helpOrderId', JSON.stringify(helpOrderId));
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={() => navigation.navigate('NovoPedido')}>
          Novo pedido de auxílio
        </Button>

        <ViewList>
          <List
            data={helpOrders}
            containerStyle={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleClick(item.id)}>
                <GerenciamentoHelpOrders data={item} />
              </TouchableOpacity>
            )}
          />
        </ViewList>
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

export default withNavigationFocus(
  connect(state => ({
    helpOrders: state.Reducers.helpOrders,
  }))(PedirAjuda),
);
