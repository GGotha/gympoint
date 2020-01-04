import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';

import {
  Container,
  Content,
  CardHeader,
  CardBox,
  Title,
  TextArea,
  AskArea,
  AnwserArea,
  Time,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api';
import { formatRelative, parseISO, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function Resposta() {
  const [helpOrder, setHelpOrder] = useState({});
  const id = useSelector(state => state.Reducers.profile.id);

  useEffect(() => {
    async function getHelpOrderById() {
      const helpOrderId = await AsyncStorage.getItem('helpOrderId');

      const response = await api.get(
        `/students/${id}/help-orders/${helpOrderId}`,
      );

      const updatedAtUtcToBrazil = addHours(
        parseISO(response.data.updatedAt),
        2,
      );

      const formatted = {
        ...response,
        question: response.data.question,
        answer:
          response.data.answer === null ? 'Sem resposta' : response.data.answer,
        updatedAt: formatRelative(updatedAtUtcToBrazil, new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      };

      setHelpOrder(formatted);
    }

    getHelpOrderById();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <CardBox>
          <AskArea>
            <View>
              <Title>Pergunta</Title>
            </View>
            <View>
              <Time>{helpOrder.updatedAt}</Time>
            </View>
          </AskArea>
          <TextArea>{helpOrder.question}</TextArea>
          <AnwserArea>
            <View>
              <Title>Resposta</Title>
            </View>
            <View>
              <TextArea>
                {helpOrder.answer === null ? 'Sem resposta' : helpOrder.answer}
              </TextArea>
            </View>
          </AnwserArea>
        </CardBox>
      </Content>
    </Container>
  );
}

Resposta.navigationOptions = ({ navigation }) => ({
  title: '',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PedirAjuda');
      }}>
      <Icon name="chevron-left" size={30} color="#000" />
    </TouchableOpacity>
  ),
});
