import React from 'react';
import { View, Text } from 'react-native';

import { Container, Time, CheckinText } from './styles';

export default function GerenciamentoCheckins() {
  return (
    <Container>
      <CheckinText>Check-in #7</CheckinText>
      <Time>Hoje às 14h</Time>
    </Container>
  );
}
