import React from 'react';
import { View } from 'react-native';
import Header from '~/components/Header';
// import { Container } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PedirAjuda() {
  return (
    <View>
      <Header />
    </View>
  );
}

PedirAjuda.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
