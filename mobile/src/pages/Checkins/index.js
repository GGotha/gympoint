import React, { useState, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import Header from '~/components/Header';
import { Container, Content, List } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GerenciamentoCheckins from '~/components/GerenciamentoCheckins';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '~/store/modules/ducks/reducers';
import api from '~/services/api';
import { format, parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function Checkins(props) {
  const [checkins, setCheckins] = useState([]);
  const [id, setId] = useState(useSelector(state => state.Reducers.profile.id));

  const dispatch = useDispatch();

  useEffect(() => {
    async function getCheckins() {
      const response = await api.get(`/students/${id}/checkins`);

      setCheckins(response.data);
    }

    getCheckins();
  }, []);

  function handleLogout() {
    dispatch(Creators.signLeave());
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={() => handleLogout()}>Sair</Button>
        <Button>Novo check-in</Button>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <GerenciamentoCheckins data={item} />}
        />
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
