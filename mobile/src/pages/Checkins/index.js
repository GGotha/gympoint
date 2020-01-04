import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import Header from '~/components/Header';
import { Container, Content, List } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GerenciamentoCheckins from '~/components/GerenciamentoCheckins';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Creators } from '~/store/modules/ducks/reducers';
import api from '~/services/api';

function Checkins(props) {
  // const [checkins, setCheckins] = useState([]);
  const [id, setId] = useState(useSelector(state => state.Reducers.profile.id));

  const dispatch = useDispatch();

  useEffect(() => {
    async function searchCheckins() {
      dispatch(Creators.listCheckinsRequest(id));
    }

    searchCheckins();
  }, []);

  const { checkins } = props;

  async function handleNewCheckin() {
    try {
      const response = await api.post(`/students/${id}/checkins`);

      if (response.data.status === 'error') {
        return Alert.alert(response.data.msg);
      }

      dispatch(Creators.listCheckinsRequest(id));
    } catch (err) {
      console.tron.log(err);
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
        <Button onPress={() => handleLogout()}>Sair</Button>
        <Button onPress={() => handleNewCheckin()}>Novo check-in</Button>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <GerenciamentoCheckins data={item} index={index} />
          )}
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

export default connect(state => ({
  checkins: state.Reducers.checkins,
}))(Checkins);
