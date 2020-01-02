import React, { Fragment } from 'react';
import { View, Text } from 'react-native';

import { Container, Main, CardHeader, StatusOrder } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function GerenciamentoHelpOrders(props) {
  const teste = 0;

  return (
    <Container>
      <CardHeader>
        <StatusOrder>
          <Icon
            name="check-circle"
            size={20}
            color={teste === 1 ? '#999999' : '#42CB59'}
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={teste === 1 ? { color: '#999999' } : { color: '#42CB59' }}>
              {teste === 1 ? 'Sem resposta' : 'Respondido'}
            </Text>
          </View>
        </StatusOrder>
        <View>
          <Text>Hoje às 14h</Text>
        </View>
      </CardHeader>
      <Main>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem enim
          cum quam porro, hic aut harum alias dolorem, vel laudantium, eveniet
          non dolore ipsum. Expedita veniam quam doloremque soluta maiores?
        </Text>
      </Main>
    </Container>
  );
}
