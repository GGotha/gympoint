import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';
import Button from '~/components/Button';

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

export default function Resposta() {
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
              <Time>Hoje às 14h</Time>
            </View>
          </AskArea>
          <TextArea>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
            reiciendis itaque laborum adipisci maiores distinctio temporibus
            nihil commodi consequuntur. Possimus, quas repellendus. Suscipit,
            ipsa officia fugit eum cum sint omnis?
          </TextArea>
          <AnwserArea>
            <View>
              <Title>Resposta</Title>
            </View>
            <View>
              <TextArea>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                reiciendis itaque laborum adipisci maiores distinctio temporibus
                nihil commodi consequuntur. Possimus, quas repellendus.
                Suscipit, ipsa officia fugit eum cum sint omnis?
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
