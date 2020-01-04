import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';

import { Container, Main, CardHeader, StatusOrder } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatRelative, parseISO, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function GerenciamentoHelpOrders(props) {
  const updatedAtUtcToBrazil = addHours(parseISO(props.data.updatedAt), 2);

  const formattedDate = useMemo(() => {
    return formatRelative(updatedAtUtcToBrazil, new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [props.data.updatedAt]);

  return (
    <Container>
      <CardHeader>
        <StatusOrder>
          <Icon
            name="check-circle"
            size={20}
            color={props.data.answer === null ? '#999999' : '#42CB59'}
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={
                props.data.answer === null
                  ? { color: '#999999' }
                  : { color: '#42CB59' }
              }>
              {props.data.answer === null ? 'Sem resposta' : 'Respondido'}
            </Text>
          </View>
        </StatusOrder>
        <View>
          <Text>{formattedDate}</Text>
        </View>
      </CardHeader>
      <Main>
        <Text>{props.data.question}</Text>
      </Main>
    </Container>
  );
}
