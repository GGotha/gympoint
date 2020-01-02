import React from 'react';
import { View, Text } from 'react-native';
import Header from '~/components/Header';
import { Container, Content, List } from './styles';
import Button from '~/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Checkins() {
  const data = [
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
    1,
    2,
    3,
    4,
  ];

  return (
    <Container>
      <Header />
      <Content style={{ padding: 20 }}>
        <Button>Novo check-in</Button>

        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Text>{item}</Text>}
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
