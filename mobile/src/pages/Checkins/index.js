import React, { useState, useEffect, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { View, Text, Alert } from 'react-native';
import Header from '~/components/Header';
import { Container, Content, List, ViewList } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GerenciamentoCheckins from '~/components/GerenciamentoCheckins';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Creators } from '~/store/modules/ducks/reducers';
import api from '~/services/api';

function Checkins({ checkins, isFocused }) {
  const id = useSelector(state => state.Reducers.profile.id);

  const dispatch = useDispatch();

  async function searchCheckins() {
    dispatch(Creators.listCheckinsRequest(id));
  }

  useEffect(() => {
    if (isFocused) {
      searchCheckins();
    }
  }, [isFocused]);

  async function handleNewCheckin() {
    try {
      const response = await api.post(`/students/${id}/checkins`);

      if (response.data.status === 'error') {
        return Alert.alert(response.data.msg);
      }

      dispatch(Creators.listCheckinsRequest(id));
    } catch (err) {
      return Alert.alert(
        'Ocorreu um erro com o servidor, tente novamente mais tarde!',
      );
    }
  }

  function handleLogout() {
    dispatch(Creators.signLeave());
  }

  return (
    <Container>
      <Header />
      <Content>
        {/* <Button onPress={() => handleLogout()}>Sair</Button> */}
        <Button onPress={() => handleNewCheckin()}>Novo check-in</Button>

        <ViewList>
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <GerenciamentoCheckins data={item} index={index} />
            )}
          />
        </ViewList>
      </Content>
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(
  connect(state => ({
    checkins: state.Reducers.checkins,
  }))(Checkins),
);
